// src/components/Modal.js
import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close">X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
