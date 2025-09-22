import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import ProfileMenu from './components/layout/ProfileMenu';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import VoiceAssistantPage from './pages/VoiceAssistantPage';
import ChatModal from './components/features/ChatModal';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // home, profile, voice-assistant
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  // Prevent body scroll when a modal or menu is open
  useEffect(() => {
    const body = document.body;
    if (showProfileMenu || showChatModal || currentPage === 'voice-assistant') {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
  }, [showProfileMenu, showChatModal, currentPage]);
  
  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <ProfilePage onGoBack={() => setCurrentPage('home')} />;
      case 'voice-assistant':
        return <VoiceAssistantPage onGoBack={() => setCurrentPage('home')} />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 relative transition-colors duration-300 overflow-x-hidden">
      {currentPage !== 'voice-assistant' && (
         <Header 
            onProfileClick={() => setShowProfileMenu(p => !p)}
            onVoiceAssistantClick={() => setCurrentPage('voice-assistant')}
            onChatClick={() => setShowChatModal(true)}
          />
      )}
      <ProfileMenu 
        show={showProfileMenu} 
        onClose={() => setShowProfileMenu(false)}
        onProfilePageClick={() => {
          setCurrentPage('profile');
          setShowProfileMenu(false);
        }}
      />
      <main>
        {renderPage()}
      </main>
      <ChatModal show={showChatModal} onClose={() => setShowChatModal(false)} />
    </div>
  );
}

export default App;
