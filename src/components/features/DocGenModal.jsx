import React, { useState } from 'react';
import { FileText, Copy } from 'lucide-react';
import Modal from '../common/Modal';
import AIResponseRenderer from '../common/AIResponseRenderer';
import { generateLegalDoc } from '../../services/geminiService';

const DocGenModal = ({ show, onClose }) => {
    const [inputValue, setInputValue] = useState("");
    const [generatedDoc, setGeneratedDoc] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');

    const handleGenerate = async () => {
        if (!inputValue.trim()) return;
        setIsLoading(true);
        setGeneratedDoc("");
        try {
            const result = await generateLegalDoc(inputValue);
            setGeneratedDoc(result);
        } catch (error) {
            console.error("Error generating document:", error);
            setGeneratedDoc("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        const textArea = document.createElement("textarea");
        textArea.value = generatedDoc;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        } catch (err) {
            setCopySuccess('Failed to copy!');
        }
        document.body.removeChild(textArea);
    };

    return (
        <Modal show={show} onClose={onClose} color="blue">
            <div className="flex flex-col h-full text-white p-6 pt-14">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-2"><FileText />  AI Legal Document Generator</h2>
                <p className="mb-6 text-white/80">Describe the document you need, and our AI will draft it for you. For example, "a basic rental agreement for a residential property."</p>
                
                <div className="flex gap-2 mb-4">
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="e.g., A non-disclosure agreement for a tech startup"
                        className="w-full p-3 rounded-lg bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white transition"
                        rows="3"
                        disabled={isLoading}
                    />
                    <button onClick={handleGenerate} disabled={isLoading || !inputValue.trim()} className="px-6 py-2 bg-white text-[#3895d3] font-bold rounded-lg hover:bg-gray-200 transition disabled:opacity-50">
                        {isLoading ? "Generating..." : "Generate"}
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
                    {generatedDoc && (
                        <>
                            <button onClick={handleCopy} className="absolute top-2 right-2 p-2 bg-white/20 rounded-lg hover:bg-white/40 transition">
                                <Copy className="w-5 h-5" />
                            </button>
                            {copySuccess && <span className="absolute top-3 right-12 text-sm bg-green-500 px-2 py-1 rounded">{copySuccess}</span>}
                            <AIResponseRenderer text={generatedDoc} />
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default DocGenModal;
