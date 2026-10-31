const { app, BrowserWindow, shell, Menu, session } = require('electron');

const JIOHOTSTAR_URL = 'https://www.hotstar.com/';
const APP_NAME = 'JioHotstar Desktop (Unofficial)';
const PARTITION = 'persist:jiohotstar';

let mainWindow;

function isHotstarUrl(value) {
  try {
    const url = new URL(value);
    return ['hotstar.com', 'jiohotstar.com'].some(
      domain => url.hostname === domain || url.hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
}

function openExternal(value) {
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' || url.protocol === 'http:') {
      shell.openExternal(url.toString());
    }
  } catch {
    // Ignore malformed or unsupported URLs.
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 900,
    minHeight: 600,
    title: APP_NAME,
    autoHideMenuBar: true,
    backgroundColor: '#08090d',
    show: false,
    webPreferences: {
      partition: PARTITION,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false
    }
  });

  // Keep the app's own title instead of allowing the website to rename the window.
  mainWindow.webContents.on('page-title-updated', event => {
    event.preventDefault();
    mainWindow?.setTitle(APP_NAME);
  });

  // Links to other sites open in the user's normal browser.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (!isHotstarUrl(url)) openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!isHotstarUrl(url)) {
      event.preventDefault();
      openExternal(url);
    }
  });

  mainWindow.webContents.on('will-redirect', (event, url) => {
    if (!isHotstarUrl(url)) event.preventDefault();
  });

  mainWindow.webContents.on('did-fail-load', (_event, code, description, validatedURL, isMainFrame) => {
    if (isMainFrame && code !== -3) {
      console.warn('JioHotstar page load failed:', code, description, validatedURL);
    }
  });

  mainWindow.once('ready-to-show', () => mainWindow?.show());
  mainWindow.on('closed', () => { mainWindow = null; });

  mainWindow.loadURL(JIOHOTSTAR_URL);
}

app.whenReady().then(() => {
  app.setAppUserModelId('web.mrcuriousmind3.jiohotstar');
  Menu.setApplicationMenu(null);

  // Keep the persistent profile so sign-in and site preferences survive restarts.
  session.fromPartition(PARTITION);

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Useful desktop shortcuts without adding a browser toolbar.
app.on('browser-window-created', (_event, win) => {
  win.webContents.on('before-input-event', (event, input) => {
    if (input.type !== 'keyDown') return;

    const key = input.key.toLowerCase();
    if (key === 'f11') {
      event.preventDefault();
      win.setFullScreen(!win.isFullScreen());
    } else if ((input.control || input.meta) && key === 'r') {
      event.preventDefault();
      win.webContents.reload();
    } else if ((input.alt) && key === 'arrowleft' && win.webContents.canGoBack()) {
      event.preventDefault();
      win.webContents.goBack();
    } else if ((input.alt) && key === 'arrowright' && win.webContents.canGoForward()) {
      event.preventDefault();
      win.webContents.goForward();
    } else if (key === 'escape' && win.isFullScreen()) {
      win.setFullScreen(false);
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
