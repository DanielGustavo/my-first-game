const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  hardResetMethod: 'exit'
});

async function createWindow() {
  const window = new BrowserWindow({
    width: 700,
    height: 600,
    useContentSize: true,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  window.on('will-resize', (e) => {
    e.preventDefault();
  });

  window.removeMenu();
  await window.loadFile('./src/displayer.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
});

Menu.setApplicationMenu(Menu.buildFromTemplate([]));
