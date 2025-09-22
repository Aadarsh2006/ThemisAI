import React, { useState } from 'react';
import { Sparkles, Download, Copy } from 'lucide-react';
import Modal from '../common/Modal';
import AIResponseRenderer from '../common/AIResponseRenderer';
import { generateLegalLetter } from '../../services/geminiService';

const LetterDrafterModal = ({ show, onClose }) => {
    const [formState, setFormState] = useState({
        caseDetails: '',
        currentCourt: '',
        reasonForTransfer: '',
        userName: ''
    });
    const [generatedLetter, setGeneratedLetter] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleGenerateLetter = async () => {
        if (!formState.reasonForTransfer.trim() || !formState.currentCourt.trim()) return;
        setIsLoading(true);
        setGeneratedLetter("");
        try {
            const result = await generateLegalLetter(formState);
            setGeneratedLetter(result);
        } catch (error) {
            console.error("Error generating letter:", error);
            setGeneratedLetter("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownloadPdf = () => {
        if (!generatedLetter || !window.jspdf) return;
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const lines = doc.splitTextToSize(generatedLetter, 180);
        doc.text(lines, 15, 15);
        
        doc.save("legal_letter_application.pdf");
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLetter).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('Failed!');
        });
    };
    
    const isFormValid = formState.reasonForTransfer.trim() && formState.currentCourt.trim();

    return (
        <Modal show={show} onClose={onClose} color="red">
            <div className="flex flex-col md:flex-row h-full text-white">
                <div className="w-full md:w-1/2 p-6 pt-14 flex flex-col">
                    <h2 className="text-3xl font-bold mb-4 flex items-center gap-2"><Sparkles />  AI Legal Letter Drafter</h2>
                    <p className="mb-6 text-white/80 text-sm">Fill in the details below to draft a formal letter, like an application to transfer a case.</p>
                    
                    <div className="space-y-3 overflow-y-auto scrollbar-hide flex-grow">
                        <input name="userName" value={formState.userName} onChange={handleInputChange} placeholder="Your Full Name (Applicant)" className="w-full p-3 rounded-lg bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white transition" />
                        <input name="caseDetails" value={formState.caseDetails} onChange={handleInputChange} placeholder="Case No. & Parties" className="w-full p-3 rounded-lg bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white transition" />
                        <input name="currentCourt" value={formState.currentCourt} onChange={handleInputChange} placeholder="Current Court Name & Location*" className="w-full p-3 rounded-lg bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white transition" />
                        <textarea name="reasonForTransfer" value={formState.reasonForTransfer} onChange={handleInputChange} placeholder="Reason for request*" className="w-full p-3 rounded-lg bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white transition" rows="6" />
                    </div>
                    
                    <button onClick={handleGenerateLetter} disabled={isLoading || !isFormValid} className="mt-4 w-full px-6 py-3 bg-white text-[#E73927] font-bold rounded-lg hover:bg-gray-200 transition disabled:opacity-50">
                        {isLoading ? "Drafting..." : "Draft Letter"}
                    </button>
                </div>

                <div className="w-full md:w-1/2 p-6 pt-14 bg-black/20 flex flex-col">
                    <h3 className="text-2xl font-bold mb-4">Generated Draft</h3>
                    <div className="flex-grow bg-white/10 rounded-lg p-4 overflow-y-auto scrollbar-hide relative">
                        {isLoading && (
                            <div className="flex justify-center items-center h-full">
                                <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                            </div>
                        )}
                        {generatedLetter && (
                            <>
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button onClick={handleCopy} className="p-2 bg-white/20 rounded-lg hover:bg-white/40 transition" title="Copy text"><Copy className="w-5 h-5" /></button>
                                    <button onClick={handleDownloadPdf} className="p-2 bg-white/20 rounded-lg hover:bg-white/40 transition" title="Download as PDF"><Download className="w-5 h-5" /></button>
                                </div>
                                {copySuccess && <span className="absolute top-3 right-24 text-sm bg-green-500 px-2 py-1 rounded">{copySuccess}</span>}
                                <AIResponseRenderer text={generatedLetter} />
                            </>
                        )}
                        {!isLoading && !generatedLetter && (
                            <div className="flex justify-center items-center h-full text-white/50"><p>Your drafted letter will appear here.</p></div>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default LetterDrafterModal;
