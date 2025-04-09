import React from 'react';
import './style.css';

const DeleteModal = ({ imageName, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Delete Photo</h2>
        <p className="modal-text">
          Are you sure you want to delete <strong>{imageName}</strong>?
        </p>
        <div className="modal-buttons">
          <button className="btn cancel-btn" onClick={onClose}>Cancel</button>
          <button className="btn delete-btn" onClick={() => onConfirm(imageName)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
