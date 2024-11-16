# Pruebas_automatizadas

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
cypress/e2e/funcionalidades
```
Navega a la carpeta de la funcionalidad de su interes y haz click en el arhivo F0xx-Ex.cy.js que deseas ejecutar para iniciarla.
Cada archivo corresponde a un escenario de prueba.

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
