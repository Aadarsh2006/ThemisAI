import React from 'react';
import { Mic, Bot, User2, Sun, Moon } from 'lucide-react';
import useTheme from '../../hooks/useTheme';

const Header = ({ onProfileClick, onVoiceAssistantClick, onChatClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-[12.5vh] w-full flex items-center justify-between px-4 sm:px-6 md:px-10 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md sticky top-0 z-40 shadow-lg border-b border-black/10 dark:border-white/10">
      <div className="flex items-center gap-2 select-none">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-wide">
          <span className="text-[#E73927] drop-shadow-md">The</span>
          <span className="text-[#3895d3] drop-shadow-md">mis</span>
        </span>
      </div>

      <nav className="grid grid-flow-col auto-cols-max gap-2 sm:gap-4 md:gap-7 items-center" role="navigation">
        <button
          onClick={toggleTheme}
          className="relative p-2 rounded-full sm:rounded-2xl bg-gray-200 dark:bg-neutral-700 shadow-md border-2 border-black/10 dark:border-white/10 transition-all duration-300 transform hover:scale-110"
          aria-label="Toggle Theme"
          title="Toggle Theme"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
          ) : (
            <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
          )}
        </button>
        <button
          onClick={onVoiceAssistantClick}
          className="relative p-2 rounded-full sm:rounded-2xl bg-gray-200 dark:bg-neutral-700 shadow-md border-2 border-black/10 dark:border-white/10 transition-all duration-300 transform hover:scale-110"
          aria-label="Voice Assistant"
          title="Voice Assistant"
        >
          <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white" />
        </button>
        <button
          onClick={onChatClick}
          className="relative p-2 rounded-full sm:rounded-2xl bg-gray-200 dark:bg-neutral-700 shadow-md border-2 border-black/10 dark:border-white/10 transition-all duration-300 transform hover:scale-110"
          aria-label="AI Chatbot"
          title="AI Chatbot"
        >
          <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white" />
        </button>
        <button
          onClick={onProfileClick}
          className="relative p-2 rounded-full sm:rounded-2xl bg-gray-200 dark:bg-neutral-700 shadow-md border-2 border-black/10 dark:border-white/10 transition-all duration-300 transform hover:scale-110"
          aria-label="Profile / Settings"
          title="Profile / Settings"
        >
          <User2 className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white" />
        </button>
      </nav>
    </header>
  );
};

export default Header;
