import React from 'react';

interface ModalProps {
    onClose: () => void;
    title: string;

    onSave: () => void;
  }
  
  const Modal: React.FC<{ onSave: (values: any, helpers: any) => void, onClose: () => void, children  }> = ({ onSave, onClose, title, children }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-xl p-6 z-20 relative modal-container">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {/* Title */}
            <h3 className="text-md font-semibold">{title}</h3>
          </div>
          {/* Close Button */}
          <button
            className="text-gray-600 hover:text-gray-800 focus:outline-none ml-auto"
            onClick={onClose}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;