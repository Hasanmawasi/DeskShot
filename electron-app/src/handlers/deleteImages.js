import { app } from 'electron';
import fs from 'fs';
import path from 'path';


const deleteImage = async (_, imagePath) => {
  try {
    const galleryPath = path.join(app.getPath('pictures'), 'electron-app');
    const filePath = path.join(galleryPath, imagePath);

    if (!fs.existsSync(filePath)) {
      return { success: false, error: 'Image not found.' };
    }

    fs.unlinkSync(filePath);

    return { success: true, message: 'Image deleted successfully.' };
  } catch (err) {
    console.error('Error deleting image:', err);
    return { success: false, error: err.message };
  }
};

export default deleteImage;
