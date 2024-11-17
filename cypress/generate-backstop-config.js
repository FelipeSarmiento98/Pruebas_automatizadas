const fs = require('fs');
const path = require('path');

// Directorios de referencia y prueba
const referenceDir = path.join(__dirname, 'cypress/screenshots/v4.5');
const testDir = path.join(__dirname, 'cypress/screenshots/v5.96.1');

// Función para generar escenarios dinámicamente
function generateScenarios(referenceDir, testDir) {
  const scenarios = [];

  // Leer todas las carpetas dentro de v4.5
  const folders = fs.readdirSync(referenceDir);

  folders.forEach((folder) => {
    const referenceFolderPath = path.join(referenceDir, folder);
    const testFolderPath = path.join(testDir, folder);

    if (fs.statSync(referenceFolderPath).isDirectory()) {
      // Leer todos los archivos PNG dentro de la carpeta actual
      const files = fs.readdirSync(referenceFolderPath).filter(file => file.endsWith('.png'));

      files.forEach((file) => {
        scenarios.push({
          label: `${folder} - ${file}`,
          referenceUrl: `file:${path.join(referenceFolderPath, file).replace(/\\/g, '/')}`,
          url: `file:${path.join(testFolderPath, file).replace(/\\/g, '/')}`,
          selectors: ["document"]
        });
      });
    }
  });

  return scenarios;
}

// Generar configuraciones dinámicamente
const scenarios = generateScenarios(referenceDir, testDir);

// Configuración base de BackstopJS
const backstopConfig = {
  id: "regression-tests",
  viewports: [
    {
      label: "desktop",
      width: 1920,
      height: 1080
    }
  ],
  scenarios,
  paths: {
    bitmaps_reference: "backstop_data/bitmaps_reference",
    bitmaps_test: "backstop_data/bitmaps_test",
    engine_scripts: "backstop_data/engine_scripts",
    html_report: "backstop_data/html_report",
    ci_report: "backstop_data/ci_report"
  },
  engine: "playwright",
  engineOptions: {
    browser: "chromium"
  },
  report: ["browser"],
  debug: false
};

// Guardar el archivo backstop.json
fs.writeFileSync(
  path.join(__dirname, 'backstop.json'),
  JSON.stringify(backstopConfig, null, 2)
);

console.log('Archivo backstop.json generado exitosamente.');
