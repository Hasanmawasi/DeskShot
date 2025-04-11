export const useSaveHandler = (canvasRef) => {
  const handleSaveImage = async () => {
    try {
      const canvas = canvasRef.current;
      const imageData = canvas.toDataURL('image/jpeg', 0.9);

      const result = await window.electronAPI.saveImage(imageData);
      if (result.success) {
        alert("Image saved successfully to: " + result.path);
      } else {
        alert("Failed to save: " + result.error);
      }
    } catch (err) {
      console.error("IPC error:", err);
      alert("Unexpected error: " + err.message);
    }
  };

  return { handleSaveImage };
};
