import { app } from 'electron';

import fs from 'fs';
import path from 'path';

const saveImage = async (_, base64Image) => {
  try {
    const buffer = Buffer.from(base64Image.split(',')[1], 'base64');

    const galleryPath = path.join(app.getPath('pictures'), 'electron-app');
    if (!fs.existsSync(galleryPath)) fs.mkdirSync(galleryPath, { recursive: true });

    const fileName = `image-${Date.now()}.jpg`;
    const destPath = path.join(galleryPath, fileName);

    fs.writeFileSync(destPath, buffer);

    const stats = fs.statSync(destPath);
    const createdAt = stats.birthtime.toISOString().split('T')[0];

    return {
      success: true,
      path: destPath,
      name: fileName,
      createdAt,
      size: stats.size,
    };
  } catch (err) {
    console.error('Error saving image:', err);
    return { success: false, error: err.message };
  }
};

  export default saveImage;
