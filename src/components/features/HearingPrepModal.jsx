import React, { useState } from 'react';
import { ClipboardCheck } from 'lucide-react';
import Modal from '../common/Modal';
import AIResponseRenderer from '../common/AIResponseRenderer';
import { generateHearingPrepSheet } from '../../services/geminiService';

const HearingPrepModal = ({ show, onClose }) => {
    const [caseType, setCaseType] = useState('');
    const [hearingDetails, setHearingDetails] = useState('');
    const [prepSheet, setPrepSheet] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!caseType.trim() || !hearingDetails.trim()) return;
        setIsLoading(true);
        setPrepSheet('');
        try {
            const result = await generateHearingPrepSheet(caseType, hearingDetails);
            setPrepSheet(result);
        } catch (error) {
            console.error("Error generating sheet:", error);
            setPrepSheet("An error occurred while generating the preparation sheet. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose} color="orange">
            <div className="flex flex-col h-full text-white p-6 pt-14">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-2"><ClipboardCheck />  AI Hearing Preparation Assistant</h2>
                <p className="mb-6 text-white/80 text-sm">Enter your case details to get an AI-generated preparation sheet, including a document checklist, potential questions, and courtroom etiquette tips.</p>
                
                <div className="flex flex-col gap-4 mb-4">
                    <input
                        value={caseType}
                        onChange={(e) => setCaseType(e.target.value)}
                        placeholder="Case Type (e.g., Mutual Divorce, Cheque Bounce)"
                        className="w-full p-3 rounded-lg bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white transition"
                        disabled={isLoading}
                    />
                    <textarea
                        value={hearingDetails}
                        onChange={(e) => setHearingDetails(e.target.value)}
                        placeholder="Hearing Stage/Details (e.g., First hearing, Evidence stage)"
                        className="w-full p-3 rounded-lg bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white transition"
                        rows="3"
                        disabled={isLoading}
                    />
                    <button onClick={handleGenerate} disabled={isLoading || !caseType.trim() || !hearingDetails.trim()} className="w-full px-6 py-3 bg-white text-[#f97316] font-bold rounded-lg hover:bg-gray-200 transition disabled:opacity-50">
                        {isLoading ? "Generating..." : "Generate Prep Sheet"}
                    </button>
                </div>

                <div className="flex-grow bg-white/10 rounded-lg p-4 overflow-y-auto scrollbar-hide relative">
                    {isLoading && (
                        <div className="flex justify-center items-center h-full">
                            <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                            <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-75 ml-2"></div>
                            <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-150 ml-2"></div>
                        </div>
                    )}
                    {prepSheet && (
                         <AIResponseRenderer text={prepSheet} />
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default HearingPrepModal;
