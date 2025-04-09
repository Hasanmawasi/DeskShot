import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import fs from 'fs'; // Make sure to import 'fs' for file operations
import path from 'path'; // You need 'path' for manipulating file paths
import icon from '../../resources/icon.png?asset';

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      webSecurity: false,
      contextIsolation: true,
      nodeIntegration: false,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  // Handle the 'save-image' IPC event
  ipcMain.handle('save-image', async (_, base64Image) => {
    try {
      // Decode base64 string
      const buffer = Buffer.from(base64Image.split(',')[1], 'base64'); // Remove the prefix "data:image/jpeg;base64,"

      // Create the directory if it doesn't exist
      const galleryPath = path.join(app.getPath('pictures'), 'electron-app');
      if (!fs.existsSync(galleryPath)) fs.mkdirSync(galleryPath, { recursive: true });

      // Define the file name and path
      const fileName = `image-${Date.now()}.jpg`; // You can generate dynamic names or use the original file name
      const destPath = path.join(galleryPath, fileName);

      // Save the image as a file
      fs.writeFileSync(destPath, buffer);

      return { success: true, path: destPath };
    } catch (err) {
      console.error('Error saving image:', err);
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('get-saved-images', async () => {
    try {
      const galleryPath = path.join(app.getPath('pictures'), 'electron-app');

      // Check if folder exists
      if (!fs.existsSync(galleryPath)) {
        return { success: false, error: 'No images found.' };
      }

      const files = fs.readdirSync(galleryPath);

      // Filter only image files
      const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file));

      // Return image file paths as `file://` URIs
      const imagePaths = imageFiles.map((file) => {
        const filePath = path.join(galleryPath, file);
        return `${filePath.replace(/\\/g, '/')}`; // Ensure correct URI format on Windows
      });

      return { success: true, images: imagePaths };
    } catch (err) {
      console.error('Error fetching images:', err);
      return { success: false, error: err.message };
    }
  });
  ipcMain.handle('delete-image', async (_, imagePath) => {
    try {
      const galleryPath = path.join(app.getPath('pictures'), 'electron-app');
      const filePath = path.join(galleryPath, imagePath);

      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        return { success: false, error: 'Image not found.' };
      }

      // Delete the image file
      fs.unlinkSync(filePath);

      return { success: true, message: 'Image deleted successfully.' };
    } catch (err) {
      console.error('Error deleting image:', err);
      return { success: false, error: err.message };
    }
  });
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer based on electron-vite cli.
  // Load the remote URL for development or the local HTML file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
  // Set app user model ID for Windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on('ping', () => console.log('pong'));

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
