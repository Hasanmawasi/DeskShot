import { useState } from "react";
export const useCropHandler = (canvasRef, dpr, drawImage) => {
  const [isCropping, setIsCropping] = useState(false);
  const [cropStart, setCropStart] = useState(null);
  const [cropEnd, setCropEnd] = useState(null);
  const [cropArea, setCropArea] = useState(null);

  const getCanvasCoordinates = (clientX, clientY) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width) / dpr,
      y: (clientY - rect.top) * (canvas.height / rect.height) / dpr
    };
  };

  const handleCropStart = (e) => {
    if (!isCropping) return;
    const coords = getCanvasCoordinates(e.clientX, e.clientY);
    setCropStart(coords);
    setCropEnd(coords);
  };

  const handleCropMove = (e) => {
    if (!isCropping || !cropStart) return;
    const coords = getCanvasCoordinates(e.clientX, e.clientY);
    setCropEnd(coords);
  };

  const handleCropEnd = () => {
    if (!isCropping || !cropStart) return;
    const startX = Math.min(cropStart.x, cropEnd.x);
    const startY = Math.min(cropStart.y, cropEnd.y);
    const width = Math.abs(cropEnd.x - cropStart.x);
    const height = Math.abs(cropEnd.y - cropStart.y);

    if (width < 10 || height < 10) return;
    setCropArea({ x: startX, y: startY, width, height });
  };

  const applyCrop = (imageRef, setImagePreview, setImagePath) => {
    if (!cropArea || cropArea.width < 1 || cropArea.height < 1) {
      alert("Please select a valid crop area");
      return;
    }

    const canvas = canvasRef.current;
    const tempCanvas = document.createElement('canvas');
    const cropWidth = Math.max(1, cropArea.width);
    const cropHeight = Math.max(1, cropArea.height);

    tempCanvas.width = cropWidth * dpr;
    tempCanvas.height = cropHeight * dpr;
    const tempCtx = tempCanvas.getContext('2d');

    tempCtx.drawImage(
      canvas,
      cropArea.x * dpr,
      cropArea.y * dpr,
      cropArea.width * dpr,
      cropArea.height * dpr,
      0,
      0,
      tempCanvas.width,
      tempCanvas.height
    );

    canvas.width = tempCanvas.width;
    canvas.height = tempCanvas.height;
    canvas.getContext('2d').drawImage(tempCanvas, 0, 0);

    canvas.style.width = `${cropWidth}px`;
    canvas.style.height = `${cropHeight}px`;

    const croppedImage = canvas.toDataURL('image/jpeg');
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      // setImagePreview(croppedImage);
      // setImagePath(croppedImage);
      drawImage(); // Force immediate redraw
    };
    img.src = croppedImage;

    setCropArea(null);
    setIsCropping(false);
  };

  return {
    isCropping,
    setIsCropping,
    cropStart,
    cropEnd,
    cropArea,
    handleCropStart,
    handleCropMove,
    handleCropEnd,
    applyCrop
  };
};
