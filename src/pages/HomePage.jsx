import React, { useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesGrid from '../components/home/ServicesGrid';
import Testimonials from '../components/home/Testimonials';
import UpcomingServices from '../components/home/UpcomingServices';
import Footer from '../components/layout/Footer';
import DocGenModal from '../components/features/DocGenModal';
import LetterDrafterModal from '../components/features/LetterDrafterModal';
import CaseStatusModal from '../components/features/CaseStatusModal';
import CrimeConsequencesModal from '../components/features/CrimeConsequencesModal';
import RightsExplainerModal from '../components/features/RightsExplainerModal';
import HearingPrepModal from '../components/features/HearingPrepModal';


const HomePage = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalId) => setActiveModal(modalId);
  const closeModal = () => setActiveModal(null);

  // State for hero section modals
  const [showRedModal, setShowRedModal] = useState(false);
  const [showBlueModal, setShowBlueModal] = useState(false);

  return (
    <>
      <HeroSection 
        showRedModal={showRedModal}
        setShowRedModal={setShowRedModal}
        showBlueModal={showBlueModal}
        setShowBlueModal={setShowBlueModal}
      />
      <ServicesGrid openModal={openModal} />
      <Testimonials />
      <UpcomingServices />
      <Footer />

      {/* Modals for ServicesGrid */}
      <DocGenModal show={activeModal === 'docGen'} onClose={closeModal} />
      <LetterDrafterModal show={activeModal === 'letterDrafter'} onClose={closeModal} />
      <CaseStatusModal show={activeModal === 'caseStatus'} onClose={closeModal} />
      <CrimeConsequencesModal show={activeModal === 'crime'} onClose={closeModal} />
      <RightsExplainerModal show={activeModal === 'rightsExplainer'} onClose={closeModal} />
      <HearingPrepModal show={activeModal === 'hearingPrep'} onClose={closeModal} />
    </>
  );
};

export default HomePage;
