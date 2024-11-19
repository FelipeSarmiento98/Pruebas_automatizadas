const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Función para ejecutar comandos de forma sincronizada
function runCommand(command, description) {
  console.log(`\n--- ${description} ---`);
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`⚠️  Error ejecutando: ${description}`);
    console.error(error.message);
  }
}

// Función para limpiar y preparar carpetas específicas de capturas
function prepareScreenshotsFolder(folder) {
  console.log(`\n--- Preparando carpeta de capturas: ${folder} ---`);
  const folderPath = path.join(__dirname, folder);
  if (fs.existsSync(folderPath)) {
    fs.rmdirSync(folderPath, { recursive: true }); // Eliminar carpeta si existe
  }
  fs.mkdirSync(folderPath, { recursive: true }); // Crear carpeta limpia
  console.log(`✅ Carpeta preparada: ${folderPath}`);
}

// Función para mover capturas de Cypress a una carpeta temporal
function moveAndRenameScreenshots(version, sourceDir, destDir) {
  console.log(`\n--- Moviendo y renombrando capturas de ${version} a ${destDir} ---`);

  if (!fs.existsSync(sourceDir)) {
    console.error(`⚠️ Carpeta fuente no encontrada: ${sourceDir}`);
    return;
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const moveFilesRecursively = (currentSource, currentDest, functionality = "") => {
    const items = fs.readdirSync(currentSource);
    items.forEach((item) => {
      const sourcePath = path.join(currentSource, item);

      if (fs.statSync(sourcePath).isDirectory()) {
        // Extraer el nombre de la funcionalidad desde la subcarpeta
        const newFunctionality = functionality || item;
        moveFilesRecursively(sourcePath, currentDest, newFunctionality);
      } else if (item.endsWith(".png")) {
        if (!item.toLowerCase().includes("step")) {
          // Ignorar archivos que no contengan "step" en el nombre
          console.log(`⚠️ Archivo ignorado (sin "step" en el nombre): ${item}`);
          return;
        }

        // Renombrar archivo con funcionalidad y quitar prefijo de versión
        const renamedFile = `${functionality}-${item.replace(`${version}-`, "")}`;
        const destPath = path.join(currentDest, renamedFile);

        fs.renameSync(sourcePath, destPath);
        console.log(`✅ Captura movida y renombrada: ${destPath}`);
      }
    });
  };

  moveFilesRecursively(sourceDir, destDir);
}

// Función para ejecutar Cypress
function runCypress(version, baseUrl, specPattern, outputFolder) {
  console.log(`\n--- Ejecutando pruebas de Cypress para ${version} ---`);
  const envCommand = `CYPRESS_BASE_URL=${baseUrl}`;
  const cypressCommand = `npx cypress run --spec "${specPattern}" --config screenshotsFolder=${outputFolder}`;
  runCommand(`${envCommand} ${cypressCommand}`, `Pruebas Cypress para versión ${version} en ${baseUrl}`);
}

// Función para generar el archivo backstop.json dinámico
function generateBackstopConfig(referenceDir, testDir) {
  console.log("\n--- Generando backstop.json ---");

  const scenarios = [];

  function addScenario(referencePath, testPath, label) {
    scenarios.push({
      label,
      referenceUrl: `file:${referencePath.replace(/\\/g, "/")}`,
      url: `file:${testPath.replace(/\\/g, "/")}`,
      selectors: ["document"],
    });
  }

  const referenceFiles = fs.readdirSync(referenceDir).filter((file) => file.endsWith(".png"));
  const testFiles = fs.readdirSync(testDir).filter((file) => file.endsWith(".png"));

  referenceFiles.forEach((file) => {
    const referenceFilePath = path.join(referenceDir, file);
    const testFilePath = path.join(testDir, file);

    if (testFiles.includes(file)) {
      addScenario(referenceFilePath, testFilePath, file);
    } else {
      console.warn(`⚠️ No se encontró archivo de prueba para: ${file}`);
    }
  });

  if (scenarios.length === 0) {
    console.error("⚠️ No se generaron escenarios. Verifica las capturas.");
    process.exit(1);
  }

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
    misMatchThreshold: 0.5,
  };

  fs.writeFileSync(
    path.join(__dirname, "backstop.json"),
    JSON.stringify(backstopConfig, null, 2)
  );

  console.log("\n--- backstop.json generado exitosamente ---");
}

// Paso 1: Preparar carpetas temporales y definitivas
prepareScreenshotsFolder("temp_screenshots");
prepareScreenshotsFolder("screenshots/v4.5");
prepareScreenshotsFolder("screenshots/v5.96.1");

// Paso 2: Ejecutar pruebas de Cypress y mover capturas
runCypress("v4.5", "http://localhost:2369/ghost", "cypress/e2e/tests/v4.5/**/*", "cypress/screenshots");
moveAndRenameScreenshots("v4.5", "cypress/screenshots", "screenshots/v4.5");

runCypress("v5.96.1", "http://localhost:2368/ghost", "cypress/e2e/tests/v5.96.1/**/*", "cypress/screenshots");
moveAndRenameScreenshots("v5.96.1", "cypress/screenshots", "screenshots/v5.96.1");

// Paso 3: Generar el archivo backstop.json dinámico
const referenceDir = path.join(__dirname, "screenshots/v4.5");
const testDir = path.join(__dirname, "screenshots/v5.96.1");
generateBackstopConfig(referenceDir, testDir);

// Paso 4: Generar referencias y ejecutar pruebas de BackstopJS
runCommand("npx backstop reference", "Generando referencias con BackstopJS");
runCommand("npx backstop test", "Ejecutando pruebas de BackstopJS");
runCommand("npx backstop openReport", "Abriendo reporte de BackstopJS");

// Confirmación del flujo completo
console.log("\n--- Flujo completo ejecutado exitosamente ---");
