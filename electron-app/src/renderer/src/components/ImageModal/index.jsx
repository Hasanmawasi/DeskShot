import React, { useState } from 'react';
import './style.css';

const ImageModal = ({ imageUrl , isOpen , onClose}) =>  {

  if (isOpen == false) return null;

  return (
    <>

        <div className="modal-overlay">
          <div className="modal-content-image">
            <button className="close-button" onClick={ (e) => {
                                                e.stopPropagation(); // Stop from re-triggering open
                                                onClose();
                                              }}>
              &times;
            </button>
            <img src={imageUrl} alt="Preview" className="modal-image" />
          </div>
        </div>

    </>
  );
}
export default ImageModal;
