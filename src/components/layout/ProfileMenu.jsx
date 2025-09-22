import React, { useRef, useEffect } from 'react';
import { User, Gavel, FileText, Settings, HelpCircle, LogOut } from 'lucide-react';

const ProfileMenu = ({ show, onClose, onProfilePageClick }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const menuItems = [
    { icon: <User className="w-5 h-5" />, text: "My Profile", action: onProfilePageClick },
    { icon: <Gavel className="w-5 h-5" />, text: "My Cases", action: () => {} },
    { icon: <FileText className="w-5 h-5" />, text: "Saved Documents", action: () => {} },
    { icon: <Settings className="w-5 h-5" />, text: "Settings", action: () => {} },
    { icon: <HelpCircle className="w-5 h-5" />, text: "Help & Support", action: () => {} },
  ];

  return (
    <div 
      ref={menuRef}
      className={`absolute right-4 top-[calc(12.5vh+10px)] w-80 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl shadow-2xl z-50 p-4 border border-gray-200 dark:border-neutral-700/50 transition-all duration-300 transform origin-top-right ${
        show ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      <div className="p-2">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src="https://placehold.co/60x60/3895d3/ffffff?text=User" 
            alt="User Avatar" 
            className="w-14 h-14 rounded-full border-2 border-blue-400"
          />
          <div>
            <p className="font-bold text-lg text-neutral-800 dark:text-white">John Doe</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">john.doe@example.com</p>
          </div>
        </div>
        <hr className="my-2 border-gray-200 dark:border-neutral-700" />
        <nav className="flex flex-col gap-1 my-2">
          {menuItems.map((item, index) => (
            <button key={index} onClick={item.action} className="flex items-center gap-3 p-3 rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-blue-100 dark:hover:bg-blue-500/10 transition-all duration-200 group">
              <span className="text-gray-500 dark:text-gray-400">{item.icon}</span>
              <span className="font-medium">{item.text}</span>
            </button>
          ))}
        </nav>
        <hr className="my-2 border-gray-200 dark:border-neutral-700" />
        <button className="flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 w-full group">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
