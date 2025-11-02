// Importamos módulos necesarios de Electron y Node
import { app, BrowserWindow, screen } from 'electron'
import { join } from 'path' // Para manejar rutas de archivos
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
// electronApp: utilidades para configurar la app
// optimizer: ayuda a optimizar ventanas y atajos en dev
// is: detecta si estamos en modo desarrollo

// Función que crea la ventana principal de la app
function createWindow() {

  // Establece un AppUserModelId (importante para Windows, barra de tareas, notificaciones)
  electronApp.setAppUserModelId('com.usagi')

  // Obtenemos las dimensiones de la pantalla principal
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Calculamos un margen del 5% del ancho de pantalla
  const margin = Math.floor(width * 0.05); // Hacemos math floor porque si tiene decimales no funcionan las coordenadas

  // Posición horizontal de la ventana desde la derecha
  const xPosition = width - 150 - margin; 

  // Creamos la ventana principal con las opciones deseadas
  const mainWindow = new BrowserWindow({
    title: "Usagi",             // Título de la ventana (aparece en la barra de tareas)
    width: 150,                  // Ancho de la ventana
    height: 150,                 // Alto de la ventana
    show: false,                 // Inicialmente no mostrar la ventana
    autoHideMenuBar: true,       // Oculta la barra de menú automáticamente
    alwaysOnTop: true,           // La ventana siempre estará encima de otras
    x: xPosition,                // Posición horizontal calculada
    y: 50,                       // Posición vertical
    frame: false,                // Sin bordes ni barra de título
    transparent: true,           // Ventana transparente
    titleBarStyle: 'hidden',     // Estilo de barra de título oculto
    resizable: false,            // No se puede redimensionar
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'), // Script preload
      sandbox: false                                   // Desactiva sandbox
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

  // Optimiza los atajos de teclado para las ventanas creadas en dev
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  });

  // Creamos la ventana principal
  createWindow()

});
