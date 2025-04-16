import { app } from 'electron';
import fs from 'fs';
import path from 'path';

const getSavedImages = async () => {
  try {
    const galleryPath = path.join(app.getPath('pictures'), 'electron-app');

    if (!fs.existsSync(galleryPath)) {
      return { success: false, error: 'No images found.' };
    }

    const files = fs.readdirSync(galleryPath);

    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    const imageData = imageFiles.map((file) => {
      const filePath = path.join(galleryPath, file);
      const stats = fs.statSync(filePath);
      const createdAt = stats.birthtime.toISOString().split('T')[0];
      const sizeKB = (stats.size / 1024).toFixed(2);

      return {
        name: file,
        path: filePath.replace(/\\/g, '/'),
        createdAt,
        size: sizeKB,
      };
    });

    return { success: true, images: imageData };
  } catch (err) {
    console.error('Error fetching images:', err);
    return { success: false, error: err.message };
  }
};

export default getSavedImages;
