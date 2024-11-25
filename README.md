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

## Requisitos Previos
- Android SDK (Kraken también corre pruebas móviles )
- Tener instalado Java (JDK 8 o superior) y configurado el JAVA_HOME en tu sistema, ya que Kraken requiere Appium.


Los reportes generados se almacenarán en la carpeta reports dentro de cada versión de Kraken.



# Pruebas de Regresión Visual con Cypress y BackstopJS

Este proyecto permite ejecutar pruebas de regresión visual para comparar capturas de pantallas generadas por Cypress en dos versiones diferentes de la aplicación. A continuación, se describe el flujo para ejecutar las pruebas:

---

## Requisitos Previos

1. Tener instalado **Node.js 18** utilizando [nvm](https://github.com/nvm-sh/nvm):
   ```bash
   nvm install 18
   nvm use 18

# Proyecto de Pruebas de Regresión Visual

## Asegúrate de que las URLs base de las versiones a probar estén accesibles:
- **Versión 4.5:** http://localhost:2369/ghost
- **Versión 5.96.1:** http://localhost:2368/ghost

## Instalación

Clona este repositorio:

```bash
git clone https://github.com/tu-repositorio.git
cd tu-repositorio
```

Accede a la carpeta del proyecto Cypress:

```bash
cd cypress
```

Instala las dependencias necesarias:

```bash
npm install
```

## Flujo de Ejecución

### Paso 1: Ejecutar las Pruebas de Regresión Visual

Ejecuta el siguiente comando para generar las capturas de pantalla, crear los escenarios y ejecutar las pruebas:

```bash
node automation.js
```

Este script realiza lo siguiente:

1. Ejecuta las pruebas de Cypress en la versión 4.5 y guarda las capturas en `screenshots/v4.5`.
2. Ejecuta las pruebas de Cypress en la versión 5.96.1 y guarda las capturas en `screenshots/v5.96.1`.
3. Renombra las capturas, asegurando que:
   - Solo se incluyan capturas con "step" en su nombre.
   - Los nombres sean consistentes entre las versiones.
4. Genera el archivo `backstop.json` con los escenarios de comparación visual.
5. Genera referencias visuales con BackstopJS basadas en las capturas de v4.5.
6. Compara las capturas de v5.96.1 con las referencias generadas.
7. Abre automáticamente el reporte de BackstopJS en el navegador.

## Personalización

Si necesitas cambiar las URLs base de las versiones o modificar los patrones de pruebas, puedes hacerlo en el archivo `automation.js`:

- **Base URL de la versión 4.5:**
  ```javascript
  runCypress("v4.5", "http://localhost:2369/ghost", "cypress/e2e/tests/v4.5//*", "cypress/screenshots");
  ```

- **Base URL de la versión 5.96.1:**
  ```javascript
  runCypress("v5.96.1", "http://localhost:2368/ghost", "cypress/e2e/tests/v5.96.1//*", "cypress/screenshots");
  ```
- **misMatchThreshold:**
  ```javascript
  misMatchThreshold: 50,
  ```
 Establece el umbral se configuro en el 50% lo que significa que las pantallas con diferencias mayor a este porcentaje no pasaran la prueba se puede configurar.

# Pruebas de Regresión Visual con Kraken y Resemble.js

Este proyecto permite realizar pruebas de regresión visual para comparar capturas de pantalla generadas por **Kraken** entre dos versiones diferentes de una aplicación. Utilizamos **Resemble.js** para identificar diferencias visuales y generar reportes en formato HTML.

---

## Requisitos Previos

1. Tener instalados **Node.js 18** y **Node.js 16** utilizando nvm:
   ```bash
   nvm install 18
   nvm install 16
   nvm use 18
   ```

2. Instalar Kraken-Node de manera global:
   ```bash
   npm install -g kraken-node
   ```

3. Tener instalado Java (JDK 8 o superior) y configurado el JAVA_HOME en tu sistema, ya que Kraken requiere Appium.

4. Tener instaladas las bibliotecas necesarias para canvas y playwright:

   En sistemas basados en Debian/Ubuntu:
   ```bash
   sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
   ```

   En macOS:
   ```bash
   brew install pkg-config cairo pango libpng jpeg giflib librsvg
   ```

5. Tener ambas versiones de Ghost corriendo localmente:
   - Versión 4.5: http://localhost:2369/ghost
   - Versión 5.96.1: http://localhost:2368/ghost

Cada carpeta de versión de Kraken (krakenv4.5 y krakenv5.96.1) contiene un archivo `properties.json`, donde se especifica la URL de la versión correspondiente y las credenciales de acceso. Un ejemplo del contenido del archivo es:

```json
{
    "baseUrl": "http://localhost:2368/ghost",
    "USERNAME": "correo@hotmail.com",
    "PASSWORD": "pasword123"
}
```

## Instalación

### Paso 1: Clonar el proyecto
Clona el repositorio e ingresa a la carpeta raíz:

```bash
git clone https://github.com/tu-repositorio.git
cd tu-repositorio
```

### Paso 2: Configurar las versiones de Node.js
En la raíz del proyecto, asegúrate de usar Node.js 18:

```bash
nvm use 18
npm install
```

Accede a la carpeta krakenv4.5:

```bash
cd krakenv4.5
nvm use 16
npm install
```

Configura el archivo `properties.json` 

Accede a la carpeta krakenv5.96.1:

```bash
cd ../krakenv5.96.1
nvm use 16
npm install
```

Configura el archivo `properties.json` 

Ahora tienes configuradas ambas versiones de Node.js (16 para Kraken y 18 para el script principal), y las URLs y credenciales están listas.

## Flujo de Ejecución

### Paso 1: Generar Capturas de Pantalla
Desde la raíz del proyecto, ejecuta el siguiente comando:

```bash
node automation.js
```

Este script realiza lo siguiente:

1. Ejecuta pruebas con Kraken en la versión 4.5 y guarda las capturas de pantalla en `krakenv4.5/reports`.
2. Ejecuta pruebas con Kraken en la versión 5.96.1 y guarda las capturas de pantalla en `krakenv5.96.1/reports`.
3. Compara las capturas entre ambas versiones utilizando Resemble.js.
4. Genera un reporte HTML con las diferencias visuales.

### Paso 2: Visualizar el Reporte
Una vez finalizado el proceso, el reporte HTML se abrirá automáticamente en tu navegador.

¡Claro! Aquí tienes el contenido en formato Markdown:

# Cypress Test Suite para Ghost v5.96.1 Semana 7 Generación de datos 

Este repositorio contiene una suite de pruebas automatizadas para Ghost versión 5.96.1, desarrollada con Cypress. Incluye pruebas a-priori, pseudoaleatorias y aleatorias para funcionalidades clave de Ghost.

## Requisitos previos

- **Node.js:** Asegúrate de tener instalada la versión 18. Si no la tienes, puedes instalarla utilizando nvm:

  ```bash
  nvm use 18
  ```

- **Ghost v5.96.1:** Debes tener una instalación de Ghost corriendo localmente en http://localhost:2368/ghost. Puedes descargar y configurar Ghost desde su sitio oficial.

- **Instalar dependencias:** Clona este repositorio e instala las dependencias con:

  ```bash
  git clone https://github.com/tu-repositorio.git
  cd tu-repositorio
  npm install
  ```

## Ejecutar las pruebas

Sigue estos pasos para ejecutar los escenarios de prueba:

### Iniciar Ghost

Asegúrate de que tu instancia de Ghost esté corriendo en la URL: http://localhost:2368/ghost.

### Abrir Cypress

1. Navega al directorio `cypress` del proyecto:

   ```bash
   cd cypress
   ```

2. Ejecuta el siguiente comando para abrir el entorno interactivo de Cypress:

   ```bash
   CYPRESS_BASE_URL=http://localhost:2368/ghost npx cypress open
   ```

### Seleccionar y ejecutar los escenarios de prueba

En el entorno de Cypress, ve a `e2e/tests/semana7`. Selecciona cualquiera de los archivos de prueba disponibles, por ejemplo:

- `F01-E1-export-apriori.cy.js`
- `F01-E2-export-pseudo.cy.js`
- `F01-E3-export-random.cy.js`

Haz clic en el archivo para ejecutarlo. Cypress mostrará los resultados de las pruebas en tiempo real.

## Estructura de los escenarios de prueba

### F01 - Importar/Exportar

Pruebas relacionadas con la funcionalidad de exportar e importar contenido.
- Archivos: `F01-E1-export.cy.js`, `F01-E2-import.cy.js`.

### F02 - Gestionar Publicaciones

Pruebas enfocadas en la creación, edición y programación de publicaciones.
- Archivos: `F02-E1-invalidPost.cy.js`, `F02-E2-markdownPost.cy.js`, `F02-E3-schedulePost.cy.js`.

### F03 - Gestionar Tags

Pruebas para la creación de tags con datos a-priori, pseudoaleatorios y aleatorios.
- Archivos: `F03-E1-addTag.apriori.cy.js`, `F03-E2-addTag.pseudo.cy.js`, `F03-E3-addTag.random.cy.js`.

### F04 - Personalización de Tags

Pruebas para cambiar el color de los tags utilizando datos de diferentes estrategias.
- Archivos: `F04-E1-changeColor.apriori.cy.js`, `F04-E2-changeColor.pseudo.cy.js`, `F04-E3-changeColor.random.cy.js`.

### F05 - Gestión de Páginas

Pruebas para la creación y personalización de páginas.
- Archivos: `F05-E1-createPage.apriori.cy.js`, `F05-E2-createPage.pseudo.cy.js`, `F05-E3-createPage.random.cy.js`.

## Notas importantes

- Asegúrate de que Ghost esté corriendo en la URL especificada antes de ejecutar las pruebas.
- Si necesitas cambiar la URL de la instancia de Ghost, actualiza la variable `CYPRESS_BASE_URL` en el comando de ejecución.
- Cada prueba incluye capturas de pantalla automáticas que se almacenan en el directorio `cypress/screenshots`.


