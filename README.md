# Pruebas_automatizadas

# - Pruebas de Extremo a Extremo
# Integrantes:  

Jhoan Felipe Sarmiento Ortiz jf.sarmiento23@uniandes.edu.co

# Paso a Paso para Ejecutar las Pruebas con Cypress

## 1. Clonar el Proyecto desde GitHub
```bash
git clone https://github.com/FelipeSarmiento98/Pruebas_automatizadas.git
cd Pruebas_automatizadas
```

## 2. Instalar Node.js con NVM
Si no tienes Node.js instalado o necesitas la versión correcta:

### Instala NVM (Node Version Manager):
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```
Luego, reinicia tu terminal o ejecuta:
```bash
source ~/.bashrc
```

### Instala la versión 18 de Node.js:
```bash
nvm install 18
nvm use 18
```

### Verifica la versión instalada:
```bash
node -v
npm -v
```

## 3. Instalar Dependencias de Cypress
Cambia al directorio de Cypress:
```bash
cd cypress
```

Instala las dependencias necesarias:
```bash
npm install
```

## 4. Abrir la Interfaz de Cypress
Ejecuta el comando para abrir la interfaz de Cypress:
```bash
npx cypress open
```
En la interfaz, selecciona tu navegador de preferencia, como Chrome o cualquier otro que tengas instalado.

## 5. Ejecutar las Pruebas
Dentro de la interfaz de Cypress, selecciona las pruebas que deseas ejecutar. Estas se encuentran en la carpeta:
```bash
cypress/e2e/tests
```
Navega a la carpeta de la versión de tu interés: v4.5 o v5.96.1.

## Requisitos Previos
Antes de ejecutar las pruebas, asegúrate de que estás corriendo la versión correcta de Ghost en tu entorno local:

### Verifica la instalación de Ghost-CLI y Ghost:
```bash
ghost --version
```
Asegúrate de que las versiones sean:
- Ghost-CLI: 1.26.1
- Ghost: 5.96.1

### Si no tienes Ghost corriendo, inicia el servidor en tu entorno local:
```bash
ghost start
```
Confirma que Ghost esté corriendo correctamente accediendo a:
```bash
http://localhost:2368
```

## Configuración de Cypress

### Configuración de Credenciales en command.js
Para automatizar el inicio de sesión en Ghost, agrega tus credenciales en el archivo cypress/support/command.js.
Al correr las pruebas, usa el siguiente comando para establecer la URL base:

Para la versión 4.5 de Ghost (se usó el puerto 2369):
```bash
CYPRESS_BASE_URL='http://localhost:2369/ghost' npx cypress open
```
Solo se correrán las pruebas en `cypress/e2e/tests/v4.5`.

Para la versión 5.96.1 de Ghost (se usó puerto 2368):
```bash
CYPRESS_BASE_URL='http://localhost:2368/ghost' npx cypress open
```
Solo se correrán las pruebas en `cypress/e2e/tests/v5.96.1`.


# Guía para Ejecutar Pruebas de Extremo a Extremo con Kraken

## 1. Clonar el Proyecto desde GitHub
Descarga el repositorio en tu máquina local y navega a la carpeta del proyecto:

```bash
git clone https://github.com//.git
cd 
```

## 2. Cambiar a la Versión de Kraken
Navega a la carpeta de la versión de Kraken que deseas ejecutar (por ejemplo, krakenv4.5 o krakenv5.96.1):

```bash
cd krakenv4.5
```

## 3. Configurar Node.js para Kraken
Kraken requiere Node.js v16. Si estás utilizando NVM, cambia a la versión correcta:

```bash
nvm use 16
```

Si no tienes Node.js v16 instalado, agrégalo con:

```bash
nvm install 16
nvm use 16
```

## 4. Configurar el Archivo properties.json
Dentro de cada carpeta de Kraken (krakenv4.5 o krakenv5.96.1), hay un archivo llamado properties.json. Este archivo contiene las credenciales y el puerto del servidor local de Ghost. Asegúrate de configurarlo correctamente:

Para la versión 5.9 de Kraken:

```json
{
  "host": "",
  "username": "admin@example.com",
  "password": "adminpassword"
}
```

Para la versión 4.5 de Kraken:

```json
{
  "host": "",
  "username": "admin@example.com",
  "password": "adminpassword"
}
```

## 5. Instalar Dependencias
Instala las dependencias necesarias para ejecutar Kraken:

```bash
npm install
```

## 6. Ejecutar Kraken
Ejecuta Kraken con el siguiente comando:

```bash
./node_modules/kraken-node/bin/kraken-node run
```

Este comando iniciará las pruebas de extremo a extremo configuradas para esta versión.

## 7. Repetir el Proceso para Otra Versión de Kraken
Si necesitas comparar dos versiones de Kraken, repite los pasos 2 al 6 para la segunda versión (por ejemplo, krakenv5.96.1).

## Notas Adicionales
Asegúrate de que el archivo properties.json esté correctamente configurado con las credenciales de administrador y el puerto del servidor Ghost correspondiente:

- Para la versión 5.9: Puerto 2368.
- Para la versión 4.5: Puerto 2369.

Ghost debe estar corriendo en tu entorno local para que Kraken pueda interactuar con la aplicación. Si no está iniciado, usa:

```bash
ghost start
```

Los reportes generados se almacenarán en la carpeta reports dentro de cada versión de Kraken.

Aquí tienes el contenido en Markdown listo para pegar en tu README.md:


# Pruebas de Regresión Visual con Cypress y BackstopJS

Este proyecto permite ejecutar pruebas de regresión visual para comparar capturas de pantallas generadas por Cypress en dos versiones diferentes de la aplicación. A continuación, se describe el flujo para ejecutar las pruebas:

---

## Requisitos Previos

1. Tener instalado **Node.js 18** utilizando [nvm](https://github.com/nvm-sh/nvm):
   ```bash
   nvm install 18
   nvm use 18
Asegúrate de que las URLs base de las versiones a probar estén accesibles:
Versión 4.5: http://localhost:2369/ghost
Versión 5.96.1: http://localhost:2368/ghost
Instalación
Clona este repositorio:

bash
Copiar código
git clone https://github.com/tu-repositorio.git
cd tu-repositorio
Accede a la carpeta del proyecto Cypress:

bash
Copiar código
cd cypress
Instala las dependencias necesarias:

bash
Copiar código
npm install
Flujo de Ejecución
Paso 1: Ejecutar las Pruebas de Regresión Visual
Ejecuta el siguiente comando para generar las capturas de pantalla, crear los escenarios y ejecutar las pruebas:

bash
Copiar código
node automation.js
Este script realiza lo siguiente:

Ejecuta las pruebas de Cypress en la versión 4.5 y guarda las capturas en screenshots/v4.5.
Ejecuta las pruebas de Cypress en la versión 5.96.1 y guarda las capturas en screenshots/v5.96.1.
Renombra las capturas, asegurando que:
Solo se incluyan capturas con "step" en su nombre.
Los nombres sean consistentes entre las versiones.
Genera el archivo backstop.json con los escenarios de comparación visual.
Genera referencias visuales con BackstopJS basadas en las capturas de v4.5.
Compara las capturas de v5.96.1 con las referencias generadas.
Abre automáticamente el reporte de BackstopJS en el navegador.

Personalización
Si necesitas cambiar las URLs base de las versiones o modificar los patrones de pruebas, puedes hacerlo en el archivo automation.js:

Base URL de la versión 4.5:
javascript
Copiar código
runCypress("v4.5", "http://localhost:2369/ghost", "cypress/e2e/tests/v4.5/**/*", "cypress/screenshots");
Base URL de la versión 5.96.1:
javascript
Copiar código
runCypress("v5.96.1", "http://localhost:2368/ghost", "cypress/e2e/tests/v5.96.1/**/*", "cypress/screenshots");



