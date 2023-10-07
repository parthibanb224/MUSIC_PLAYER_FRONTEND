// Modal.js
import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md backdrop-filter">
      <div className="bg-white p-8 shadow-md rounded-lg w-96">
        <button onClick={onClose} className="absolute top-4 right-4 text-black hover:text-gray-700">
          Close
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
