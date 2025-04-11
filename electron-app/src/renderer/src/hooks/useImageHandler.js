import { useState, useRef, useEffect } from 'react';

export const useImageHandler = () => {
  const [imagePreview, setImagePreview] = useState("src/assets/camera.jpg");
  const [imagePath, setImagePath] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [dpr, setDpr] = useState(1);
  const [scaleFactor, setScaleFactor] = useState(1);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        imageRef.current = img;
        setImagePath(reader.result);
        setImagePreview(reader.result);
      };
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const handleResize = () => {
      if (!imageRef.current || !canvasRef.current) return;

      const container = containerRef.current;
      const maxWidth = container.clientWidth;
      const maxHeight = window.innerHeight * 0.6;

      const naturalWidth = imageRef.current.width;
      const naturalHeight = imageRef.current.height;

      const scale = Math.min(
        maxWidth / naturalWidth,
        maxHeight / naturalHeight
      );

      const scaledWidth = naturalWidth * scale;
      const scaledHeight = naturalHeight * scale;

      const canvas = canvasRef.current;
      canvas.style.width = `${scaledWidth}px`;
      canvas.style.height = `${scaledHeight}px`;

      const devicePixelRatio = window.devicePixelRatio || 1;
      setDpr(devicePixelRatio);

      canvas.width = naturalWidth * devicePixelRatio;
      canvas.height = naturalHeight * devicePixelRatio;

      setScaleFactor(scale);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [imagePath  ]);

  return {
    imagePreview,
    imagePath,
    canvasRef,
    containerRef,
    imageRef,
    dpr,
    setDpr,
    scaleFactor,
    handleFileChange,
    setImagePreview,
    setImagePath
  };
};
