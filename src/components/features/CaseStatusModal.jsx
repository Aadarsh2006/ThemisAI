import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Modal from '../common/Modal';
import AIResponseRenderer from '../common/AIResponseRenderer';
import { getAiCaseStatus } from '../../services/geminiService';

const CaseStatusModal = ({ show, onClose }) => {
    const [caseNumber, setCaseNumber] = useState('');
    const [caseStatus, setCaseStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckStatus = async () => {
        if (!caseNumber.trim()) return;
        setIsLoading(true);
        setCaseStatus('');
        try {
            const result = await getAiCaseStatus(caseNumber);
            setCaseStatus(result);
        } catch (error) {
            console.error("Error fetching case status:", error);
            setCaseStatus("An error occurred while fetching the status. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose} color="purple">
            <div className="flex flex-col h-full text-white p-6 pt-14">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-2"><Search />  AI Case Status Tracker</h2>
                <p className="mb-6 text-white/80">Enter your case number to get the latest status, history, and AI-powered recommendations. This is a simulation and not a connection to official court records.</p>
                
                <div className="flex gap-2 mb-4">
                    <input
                        value={caseNumber}
                        onChange={(e) => setCaseNumber(e.target.value)}
                        placeholder="e.g., O.S. No. 123/2024"
                        className="w-full p-3 rounded-lg bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white transition"
                        disabled={isLoading}
                    />
                    <button onClick={handleCheckStatus} disabled={isLoading || !caseNumber.trim()} className="px-6 py-2 bg-white text-[#6d28d9] font-bold rounded-lg hover:bg-gray-200 transition disabled:opacity-50">
                        {isLoading ? "Checking..." : "Check Status"}
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
                    {caseStatus && (
                         <AIResponseRenderer text={caseStatus} />
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default CaseStatusModal;
