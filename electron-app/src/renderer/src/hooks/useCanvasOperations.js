import { useEffect } from 'react';

export const useCanvasOperations = (canvasRef, imageRef, dpr, rotationAngle, isBlackWhite, watermarkText) => {
  const drawImage = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current) return;

    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    // Apply image transformations
    ctx.filter = isBlackWhite ? 'grayscale(100%)' : 'none';
    const centerX = (canvas.width / dpr) / 2;
    const centerY = (canvas.height / dpr) / 2;

    ctx.translate(centerX, centerY);
    ctx.rotate((rotationAngle * Math.PI) / 180);
    ctx.drawImage(
      imageRef.current,
      -imageRef.current.width / 2,
      -imageRef.current.height / 2
    );
    ctx.restore();

    // Draw watermark
    if (watermarkText) {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.fillStyle = 'rgba(9, 8, 8, 0.84)';
      ctx.font = `bold ${24 * dpr}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        watermarkText,
        canvas.width / (2 * dpr),
        canvas.height / (2 * dpr)
      );
      ctx.restore();
    }
  };

  const redrawCanvasWithOverlay = (isCropping, cropStart, cropEnd) => {
    if (!isCropping || !cropStart || !cropEnd) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.scale(dpr, dpr);

    const startX = Math.min(cropStart.x, cropEnd.x);
    const startY = Math.min(cropStart.y, cropEnd.y);
    const width = Math.abs(cropEnd.x - cropStart.x);
    const height = Math.abs(cropEnd.y - cropStart.y);

    // Draw overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width / dpr, startY);
    ctx.fillRect(0, startY + height, canvas.width / dpr, (canvas.height / dpr) - startY - height);
    ctx.fillRect(0, startY, startX, height);
    ctx.fillRect(startX + width, startY, (canvas.width / dpr) - startX - width, height);

    // Draw crop rectangle
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.strokeRect(startX, startY, width, height);
    ctx.restore();
  };

  return { drawImage, redrawCanvasWithOverlay };
};
