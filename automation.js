import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import resemble from "resemblejs";
import open from "open";

const reportDir = "./resemble-reports";

if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
}

import os from "os";

const executeCommand = (command, cwd, useNode16 = false) => {
    try {
        let fullCommand;

        if (useNode16) {
            if (os.platform() === "win32") {
                // Comando para Windows
                fullCommand = `nvm use 16 && ${command}`;
            } else {
                // Comando para macOS/Linux
                fullCommand = `. $HOME/.nvm/nvm.sh && nvm use 16 > /dev/null && ${command}`;
            }
        } else {
            fullCommand = command;
        }

        console.log(`Ejecutando: ${fullCommand} en ${cwd}`);
        execSync(fullCommand, { cwd, stdio: "inherit", shell: os.platform() === "win32" ? "cmd.exe" : "/bin/bash" });
    } catch (error) {
        console.warn(`Advertencia: Falló la ejecución del comando en ${cwd}.`);
        console.warn(`Error: ${error.message}`);
        // Continuar sin detener el programa
    }
};



const clearReports = (reportsPath) => {
    if (fs.existsSync(reportsPath)) {
        console.log(`Limpiando reports en ${reportsPath}`);
        const directories = fs.readdirSync(reportsPath, { withFileTypes: true });
        directories.forEach((dir) => {
            const fullPath = path.join(reportsPath, dir.name);
            if (dir.isDirectory()) {
                fs.rmSync(fullPath, { recursive: true, force: true });
            }
        });
    }
};

const getFoldersInReports = (reportsPath) => {
    return fs
        .readdirSync(reportsPath, { withFileTypes: true })
        .filter((dir) => dir.isDirectory())
        .map((dir) => path.join(reportsPath, dir.name));
};

const compareScreenshots = async (baseFolder, compareFolder, htmlReport) => {
    const baseScreenshots = fs
        .readdirSync(path.join(baseFolder, "screenshots"))
        .sort();
    const compareScreenshotsList = fs
        .readdirSync(path.join(compareFolder, "screenshots"))
        .sort();

    const maxLength = Math.min(baseScreenshots.length, compareScreenshotsList.length);

    for (let i = 0; i < maxLength; i++) {
        const baseImagePath = path.join(baseFolder, "screenshots", baseScreenshots[i]);
        const compareImagePath = path.join(
            compareFolder,
            "screenshots",
            compareScreenshotsList[i]
        );
        const diffImageName = `${path.basename(baseFolder)}_vs_${path.basename(compareFolder)}_diff_${baseScreenshots[i]}`;
        const diffImagePath = path.join("./resemble-reports", diffImageName);

        try {
            console.log(`Comparando: ${baseImagePath} con ${compareImagePath}`);
            await new Promise((resolve, reject) => {
                resemble(baseImagePath)
                    .compareTo(compareImagePath)
                    .ignoreColors()
                    .onComplete((data) => {
                        console.log(`Diferencia: ${data.misMatchPercentage}%`);
                        if (data.getBuffer) {
                            fs.writeFileSync(diffImagePath, data.getBuffer());
                            console.log(`Reporte guardado en: ${diffImagePath}`);
                        }

                        // Añadir al HTML con rutas relativas
                        htmlReport.push(`
                            <tr>
                                <td><img src="../${baseImagePath}" alt="Base" width="300"></td>
                                <td><img src="../${compareImagePath}" alt="Compare" width="300"></td>
                                <td><img src="${diffImageName}" alt="Diff" width="300"></td>
                                <td>${data.misMatchPercentage}%</td>
                            </tr>
                        `);

                        resolve();
                    });
            });
        } catch (error) {
            console.warn(`Omitiendo comparación entre ${baseImagePath} y ${compareImagePath}: ${error.message}`);
        }
    }
};


const generateHtmlReport = (htmlContent) => {
    const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reseamble Report</title>
            <style>
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
                th { background-color: #f4f4f4; }
                img { max-width: 100%; }
            </style>
        </head>
        <body>
            <h1>Reporte de Comparaciones</h1>
            <table>
                <thead>
                    <tr>
                        <th>Imagen Base</th>
                        <th>Imagen Comparada</th>
                        <th>Imagen de Diferencias</th>
                        <th>Diferencia (%)</th>
                    </tr>
                </thead>
                <tbody>
                    ${htmlContent.join("\n")}
                </tbody>
            </table>
        </body>
        </html>
    `;

    const outputHtmlPath = path.join(reportDir, "report.html");
    fs.writeFileSync(outputHtmlPath, htmlTemplate);
    console.log(`Reporte HTML generado en: ${outputHtmlPath}`);
    return outputHtmlPath;
};

const main = async () => {
    const krakenV4Path = "./krakenv4.5";
    const krakenV5Path = "./krakenv5.96.1";

    const reportsV4Path = path.join(krakenV4Path, "reports");
    const reportsV5Path = path.join(krakenV5Path, "reports");

    // Paso 1: Limpia `reports` al inicio
    clearReports(reportsV4Path);
    clearReports(reportsV5Path);

    // Paso 2: Genera capturas para ambas versiones con Node.js 16
    executeCommand("./node_modules/kraken-node/bin/kraken-node run", krakenV4Path, true);
    executeCommand("./node_modules/kraken-node/bin/kraken-node run", krakenV5Path, true);

    // Paso 3: Comparar capturas y generar reporte HTML
    const foldersV4 = getFoldersInReports(reportsV4Path);
    const foldersV5 = getFoldersInReports(reportsV5Path);
    const htmlReport = [];

    for (let i = 0; i < foldersV4.length; i++) {
        const folderV4 = foldersV4[i];
        const folderV5 = foldersV5[i];

        if (folderV5) {
            console.log(`Comparando carpetas: ${folderV4} con ${folderV5}`);
            await compareScreenshots(folderV4, folderV5, htmlReport);
        }
    }

    const reportPath = generateHtmlReport(htmlReport);

    // Abre el reporte en el navegador automáticamente
    await open(reportPath);

    console.log("Proceso completado. Los reportes están disponibles en ./resemble-reports.");
};

main().catch((err) => console.error("Error general:", err));
