import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import { startServer, stopServer } from '../src/server'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
    width: 600,
    height: 350,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

app.on('before-quit', () => {
  stopServer();
})

app.on('window-all-closed', () => {
  win = null
  app.quit()
})

app.whenReady().then(createWindow)

ipcMain.on('start', (channel, events) => {
  const response = startServer(events.host, events.port);
  channel.sender.send('start', response)
})

ipcMain.on('stop', (channel) => {
  const response = stopServer();
  channel.sender.send('stop', response)
})