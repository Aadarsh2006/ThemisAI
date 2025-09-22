import React, { useState } from 'react';
import { BookUser } from 'lucide-react';
import Modal from '../common/Modal';
import AIResponseRenderer from '../common/AIResponseRenderer';
import { getRightsExplanation } from '../../services/geminiService';

const RightsExplainerModal = ({ show, onClose }) => {
    const [query, setQuery] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!query.trim()) return;
        setIsLoading(true);
        setAnalysis('');

        try {
            const result = await getRightsExplanation(query);
            setAnalysis(result);
        } catch (error) {
            console.error("Error fetching analysis:", error);
            setAnalysis("An error occurred while fetching the analysis. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose} color="yellow">
            <div className="flex flex-col h-full text-white p-6 pt-14">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-2"><BookUser />  AI Rights Explainer</h2>
                <p className="mb-6 text-white/80 text-sm">Ask about your rights in any situation (e.g., "what are my rights as a tenant in Delhi?"). Get a clear explanation of your legal standing in India. This is for informational purposes only.</p>
                
                <div className="flex gap-2 mb-4">
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., What are my rights if I am stopped by the police?"
                        className="w-full p-3 rounded-lg bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white transition"
                        rows="3"
                        disabled={isLoading}
                    />
                    <button onClick={handleAnalyze} disabled={isLoading || !query.trim()} className="px-6 py-2 bg-white text-[#ca8a04] font-bold rounded-lg hover:bg-gray-200 transition disabled:opacity-50">
                        {isLoading ? "Explaining..." : "Explain Rights"}
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
                    {analysis && (
                         <AIResponseRenderer text={analysis} />
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default RightsExplainerModal;
