import React from 'react';

const ConfirmationModal = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[60] transition-all duration-500 ease-in-out p-4">
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`relative p-8 bg-white dark:bg-neutral-800 rounded-lg shadow-xl text-center max-w-sm mx-auto transform transition-transform duration-500 ease-in-out ${
          show ? "translate-y-0 scale-100" : "translate-y-10 scale-95"
        }`}
      >
        <h3 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-white">Action Confirmed</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6">{message}</p>
        <button
          onClick={onConfirm}
          className="px-5 py-2 rounded-2xl bg-black text-white hover:opacity-90 transition-all"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
