import { useState } from 'react';

export const useImageEffects = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isBlackWhite, setIsBlackWhite] = useState(false);
  const [watermarkText, setWatermarkText] = useState('');

  const rotateImage = () => {
    setRotationAngle(prev => (prev + 90) % 360);
  };

  const toggleBlackWhite = () => {
    setIsBlackWhite(!isBlackWhite);
  };

  return {
    rotationAngle,
    isBlackWhite,
    watermarkText,
    setWatermarkText,
    rotateImage,
    toggleBlackWhite
  };
};
