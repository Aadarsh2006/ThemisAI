import React from 'react';
import { X } from "lucide-react";

const Modal = ({ children, show, onClose, color }) => {
  const modalStyle =
    color === "red"
      ? "from-[#d9334f] to-[#ff4b2b]"
      : color === "blue"
      ? "from-[#2f6db0] to-[#00b4d8]"
      : color === "purple"
      ? "from-[#6d28d9] to-[#9333ea]"
      : color === "yellow"
      ? "from-[#ca8a04] to-[#facc15]"
      : color === "orange"
      ? "from-[#f97316] to-[#fb923c]"
      : "from-[#16a34a] to-[#22c55e]";

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`relative bg-gradient-to-br ${modalStyle} glitter-gradient rounded-2xl shadow-2xl max-w-5xl w-[92%] sm:w-[90%] h-[90vh] transform transition-transform duration-300 flex flex-col ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-grow overflow-y-auto scrollbar-hide">
          {children}
        </div>
        <button
          className="absolute top-3 right-3 p-2 transition-all duration-300 rounded-full group z-50"
          onClick={onClose}
        >
          <X 
            className="w-6 h-6 transition-colors duration-300 text-white/70 group-hover:text-white group-active:text-red-500" 
          />
        </button>
      </div>
    </div>
  );
};

export default Modal;
