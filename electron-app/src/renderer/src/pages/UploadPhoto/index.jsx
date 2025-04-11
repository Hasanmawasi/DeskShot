import React, { useState, useRef, useEffect } from 'react';
import "./style.css"
import InputField from "../../components/Input";
import Button from '../../components/Button';
import { useImageHandler } from '../../hooks/useImageHandler';
import { useCropHandler } from '../../hooks/useCropHandler';
import { useImageEffects } from '../../hooks/useImageEffects';
import { useSaveHandler } from '../../hooks/useSaveHandler';
import { useCanvasOperations } from '../../hooks/useCanvasOperations';
const UploadPhoto = () => {
  const {
    imagePreview,
    imagePath,
    canvasRef,
    containerRef,
    imageRef,
    dpr,
    handleFileChange,
    setImagePreview,
    setImagePath
  } = useImageHandler();

  const {
    rotationAngle,
    isBlackWhite,
    watermarkText,
    setWatermarkText,
    rotateImage,
    toggleBlackWhite
  } = useImageEffects();

  const { drawImage, redrawCanvasWithOverlay } = useCanvasOperations(
    canvasRef,
    imageRef,
    dpr,
    rotationAngle,
    isBlackWhite,
    watermarkText
  );

  const {
    isCropping,
    setIsCropping,
    cropStart,
    cropEnd,
    cropArea,
    handleCropStart,
    handleCropMove,
    handleCropEnd,
    applyCrop
  } = useCropHandler(canvasRef, dpr, drawImage);

  const { handleSaveImage } = useSaveHandler(canvasRef);

  // Effect for automatic redraw
  useEffect(() => {
    drawImage();
    redrawCanvasWithOverlay(isCropping, cropStart, cropEnd);
  }, [imagePath, rotationAngle, isBlackWhite, watermarkText, isCropping, cropStart, cropEnd]);

  return (
    <div className='upload-container'>
    <div className="input-container">
      <InputField
        label={"photo"}
        placeholder={"Choose your photo"}
        type='file'
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>

    <div className="edit-photo">
      <div className="upl-image" ref={containerRef}>
        <canvas
          ref={canvasRef}
          onMouseDown={handleCropStart}
          onMouseMove={handleCropMove}
          onMouseUp={handleCropEnd}
          onMouseLeave={handleCropEnd}
          className='canvas'
          style={{ cursor: isCropping ? 'crosshair' : '' }}
        />
      </div>
      <div className="controls-container">
        <div className="image-controls">
          <div className="effects-controls">
            <h4>Effects:</h4>
            <button
              onClick={toggleBlackWhite}
              className={isBlackWhite ? 'active' : ''}
            >
              {isBlackWhite ? 'Color Mode' : 'Black & White'}
            </button>
          </div>

          <div className="watermark-controls">
            <h4>Watermark:</h4>
            <InputField
              type="text"
              placeholder="Enter watermark text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
            />
          </div>
        </div>

         <div className="bottom flex flex-row align-center justify-space-between p-1">
          <div className="icons flex flex-row g-1">
            <img
              className='edit-icon'
              src="src/assets/rotate.svg"
              alt="rotate"
              onClick={rotateImage}
            />
            <img
              className='edit-icon'
              src="src/assets/crop.svg"
              alt="crop"
              onClick={() => setIsCropping(!isCropping)}
            />
          </div>

          <Button
            label={isCropping ? "Apply Crop" : "Save"}
            style={"save-button"}
            onClick={isCropping ? applyCrop : handleSaveImage}
          />
        </div>
      </div>
    </div>
  </div>
  );
};

export default UploadPhoto;
