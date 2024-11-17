const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const open = require("open"); // Dependencia para abrir el navegador automáticamente

// Función para ejecutar comandos de forma sincronizada
function runCommand(command, description) {
  console.log(`\n--- ${description} ---`);
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`⚠️  Error ejecutando: ${description}`);
    console.error(error.message);
    // Continuar el flujo sin detener
  }
}

// Función para limpiar únicamente archivos dentro de una carpeta específica
function cleanFilesInFolder(folder) {
  console.log(`\n--- Limpiando archivos dentro de la carpeta: ${folder} ---`);
  const folderPath = path.join(__dirname, folder);
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const filePath = path.join(folderPath, file);
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath); // Eliminar archivo
      }
    });
  } else {
    // Crear carpeta si no existe
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Carpeta creada: ${folderPath}`);
  }
}

// Carpetas de capturas para ambas versiones
const foldersToSetup = [
  "screenshots/v4.5/export.cy.js",
  "screenshots/v4.5/import.cy.js",
  "screenshots/v4.5/invalidPost.cy.js",
  "screenshots/v4.5/markdownPost.cy.js",
  "screenshots/v4.5/schedulePost.cy.js",
  "screenshots/v5.96.1/export.cy.js",
  "screenshots/v5.96.1/import.cy.js",
  "screenshots/v5.96.1/invalidPost.cy.js",
  "screenshots/v5.96.1/markdownPost.cy.js",
  "screenshots/v5.96.1/schedulePost.cy.js",
];

// Configurar carpetas para capturas (sin eliminar capturas de otras versiones)
foldersToSetup.forEach((folder) => cleanFilesInFolder(folder));

// Función para ejecutar pruebas de Cypress
function runCypress(version, baseUrl, outputFolder, specPattern) {
  console.log(`\n--- Ejecutando pruebas de Cypress para ${version} ---`);
  const envCommand = `CYPRESS_BASE_URL=${baseUrl}`;
  const cypressCommand = `npx cypress run --spec "${specPattern}" --config screenshotsFolder=screenshots/${outputFolder}`;
  runCommand(`${envCommand} ${cypressCommand}`, `Pruebas Cypress en ${baseUrl}`);
}

// Paso 1: Ejecutar pruebas para v4.5
runCypress("v4.5", "http://localhost:2369/ghost", "v4.5", "cypress/e2e/tests/v4.5/**/*");

// Paso 2: Ejecutar pruebas para v5.96.1
runCypress("v5.96.1", "http://localhost:2368/ghost", "v5.96.1", "cypress/e2e/tests/v5.96.1/**/*");

// Paso 3: Generar backstop.json dinámico
const referenceDir = path.join(__dirname, "screenshots/v4.5");
const testDir = path.join(__dirname, "screenshots/v5.96.1");

function generateBackstopConfig(referenceDir, testDir) {
  const scenarios = [];
  const folders = fs.readdirSync(referenceDir);

  folders.forEach((folder) => {
    const referenceFolderPath = path.join(referenceDir, folder);
    const testFolderPath = path.join(testDir, folder);

    if (fs.statSync(referenceFolderPath).isDirectory()) {
      const files = fs.readdirSync(referenceFolderPath).filter((file) => file.endsWith(".png"));

      files.forEach((file) => {
        scenarios.push({
          label: `${folder} - ${file}`,
          referenceUrl: `file:${path.join(referenceFolderPath, file).replace(/\\/g, "/")}`,
          url: `file:${path.join(testFolderPath, file).replace(/\\/g, "/")}`,
          selectors: ["document"],
        });
      });
    }
  });

  const backstopConfig = {
    id: "regression-tests",
    viewports: [
      {
        label: "desktop",
        width: 1920,
        height: 1080,
      },
    ],
    scenarios,
    paths: {
      bitmaps_reference: "backstop_data/bitmaps_reference",
      bitmaps_test: "backstop_data/bitmaps_test",
      engine_scripts: "backstop_data/engine_scripts",
      html_report: "backstop_data/html_report",
      ci_report: "backstop_data/ci_report",
    },
    engine: "playwright",
    engineOptions: {
      browser: "chromium",
    },
    report: ["browser"],
    debug: false,
    misMatchThreshold: 0.3,
  };

  fs.writeFileSync(
    path.join(__dirname, "backstop.json"),
    JSON.stringify(backstopConfig, null, 2)
  );

  console.log("\n--- backstop.json generado exitosamente ---");
}

generateBackstopConfig(referenceDir, testDir);

// Paso 4: Generar referencias y ejecutar pruebas de BackstopJS
runCommand("npx backstop reference", "Generando referencias con BackstopJS");
runCommand("npx backstop test", "Ejecutando pruebas de BackstopJS");

// Paso 5: Abrir reporte de BackstopJS
const reportPath = path.join(__dirname, "backstop_data/html_report/index.html");
if (fs.existsSync(reportPath)) {
  console.log("\n--- Abriendo reporte de BackstopJS ---");
  open(reportPath).catch((err) => {
    console.error("No se pudo abrir el reporte automáticamente. Ábrelo manualmente desde:", reportPath);
  });
} else {
  console.error("No se encontró el reporte de BackstopJS en:", reportPath);
}

console.log("\n--- Flujo completo ejecutado exitosamente ---");
