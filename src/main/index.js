// Importamos módulos necesarios de Electron y Node
import { app, BrowserWindow, screen } from 'electron' 
import { join } from 'path' // Para manejar rutas de archivos
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
// electronApp: utilidades para configurar la app (ej. AppUserModelId)
// optimizer: ayuda a optimizar ventanas y atajos en desarrollo
// is: detecta si estamos en modo desarrollo

// Función que crea la ventana principal de la app
function createWindow() {

  // Establece un AppUserModelId (importante para Windows, barra de tareas y notificaciones)
  electronApp.setAppUserModelId('com.usagi')

  // Obtenemos las dimensiones de la pantalla principal
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Calculamos márgenes de pantalla
  const marginX = Math.floor(width * 0.01); // margen horizontal del 1%
  const marginY = Math.floor(height * 0.05); // margen vertical del 5%

  // Posición horizontal de la ventana desde la derecha
  const xPosition = width - 150 - marginX; // 150 es el ancho de la ventana

  // Creamos la ventana principal con las opciones deseadas
  const mainWindow = new BrowserWindow({
    title: "Usagi",             // Título de la ventana (aparece en barra de tareas)
    width: 150,                  // Ancho de la ventana
    height: 150,                 // Alto de la ventana
    show: false,                 // Inicialmente no mostrar la ventana hasta que esté lista
    autoHideMenuBar: true,       // Oculta la barra de menú automáticamente
    alwaysOnTop: true,           // La ventana siempre estará encima de otras
    x: xPosition,                // Posición horizontal calculada
    y: marginY,                  // Posición vertical calculada
    frame: false,                // Sin bordes ni barra de título
    transparent: true,           // Ventana transparente
    titleBarStyle: 'hidden',     // Oculta la barra de título
    resizable: false,            // No se puede redimensionar
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'), // Script preload (carga antes del render)
      sandbox: false                                   // Desactiva sandbox para permitir Node.js
    }
  });

  // Ignorar eventos del mouse, pero permitir que se propaguen a ventanas detrás
  mainWindow.setIgnoreMouseEvents(true, { forward: true });

  // Mostrar la ventana cuando esté lista
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  });

  // Cargar contenido dependiendo del modo (desarrollo o producción)
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    // En desarrollo: cargar URL del servidor Vite
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    // En producción: cargar el archivo HTML compilado
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

}

// Evento que se dispara cuando Electron está listo
app.whenReady().then(() => {

  // Optimiza los atajos de teclado para las ventanas creadas en desarrollo
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  });

  // Creamos la ventana principal
  createWindow()

});
