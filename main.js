const { app, BrowserWindow, shell, Menu } = require('electron');

const JIOHOTSTAR_URL = 'https://www.hotstar.com/';
const APP_NAME = 'JioHotstar Desktop (Unofficial)';

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 800,
    minHeight: 600,
    title: APP_NAME,
    autoHideMenuBar: true,
    backgroundColor: '#090909',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  win.loadURL(JIOHOTSTAR_URL);

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://') || url.startsWith('http://')) shell.openExternal(url);
    return { action: 'deny' };
  });

  win.webContents.on('will-navigate', (event, url) => {
    try {
      const target = new URL(url);
      const allowed = ['hotstar.com', 'jiohotstar.com'].some(
        domain => target.hostname === domain || target.hostname.endsWith('.' + domain)
      );
      if (!allowed) {
        event.preventDefault();
        if (target.protocol === 'https:' || target.protocol === 'http:') shell.openExternal(url);
      }
    } catch (_) {
      event.preventDefault();
    }
  });

  win.webContents.on('page-title-updated', event => {
    event.preventDefault();
    win.setTitle(APP_NAME);
  });
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
