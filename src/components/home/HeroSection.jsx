import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import Modal from 'components/common/modal';
import AIResponseRenderer from 'components/common/AIResponseRenderer';
import ConfirmationModal from 'components/common/ConfirmationModal';
import { categories as caseCategories } from 'data/caseCategories';
import { generateCaseSummary } from 'services/geminiService';
import { extractTextFromFile } from 'utils/pdfUtils';


const HeroSection = ({
    showBlueModal, setShowBlueModal,
    showRedModal, setShowRedModal
}) => {

    // State for Blue Modal (Document Analysis)
    const [documentSummary, setDocumentSummary] = useState("");
    const [isSummarizingDoc, setIsSummarizingDoc] = useState(false);
    const [showUploadButton, setShowUploadButton] = useState(true);
    const fileInputRef = useRef(null);
    const docAbortControllerRef = useRef(null);

    // State for Red Modal (Case Analysis)
    const [aiCaseResponse, setAiCaseResponse] = useState(null);
    const [isSummarizingCase, setIsSummarizingCase] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const caseAbortControllerRef = useRef(null);
    const [caseDetails, setCaseDetails] = useState(null);

    const buttonStyle = "rounded-3xl bg-white/95 hover:bg-white px-6 py-3 font-semibold border border-white/20 shadow-md hover:shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all";

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (docAbortControllerRef.current) {
            docAbortControllerRef.current.abort();
        }
        docAbortControllerRef.current = new AbortController();
        const signal = docAbortControllerRef.current.signal;

        setShowUploadButton(false);
        setIsSummarizingDoc(true);
        setDocumentSummary("");

        await extractTextFromFile(file, setDocumentSummary, setIsSummarizingDoc, signal);
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const resetBlueModal = () => {
        setShowBlueModal(false);
        setDocumentSummary("");
        setShowUploadButton(true);
        if (docAbortControllerRef.current) {
            docAbortControllerRef.current.abort();
        }
    };

    const handleCaseAnalysisSubmit = (details) => {
        setCaseDetails(details);
        setShowConfirmation(true);
    };

    const handleFinalConfirmation = async () => {
        setShowConfirmation(false);
        if (!caseDetails) return;

        caseAbortControllerRef.current = new AbortController();

        setIsSummarizingCase(true);
        try {
            const summary = await generateCaseSummary(caseDetails, caseAbortControllerRef.current.signal);
            setAiCaseResponse(summary);
        } catch (error) {
            if (error.name !== 'AbortError') {
                 setAiCaseResponse("An error occurred while generating the summary.");
            }
        } finally {
            setIsSummarizingCase(false);
        }
    };

    const resetRedModal = () => {
        setShowRedModal(false);
        setAiCaseResponse(null);
        setIsSummarizingCase(false);
        setCaseDetails(null);
        if (caseAbortControllerRef.current) {
            caseAbortControllerRef.current.abort();
        }
    };

    return (
        <section className="h-auto md:h-[87.5vh] w-full overflow-hidden">
            <div className="h-full w-full grid grid-cols-1 md:grid-cols-2">
                {/* Left Side: Document Analysis */}
                <div className="relative h-[50vh] md:h-full flex items-center justify-center bg-gradient-to-br from-[#2f6db0] to-[#00b4d8] hover:scale-105 transition-transform duration-300 glitter-gradient">
                    <div className="px-6 text-center transition-opacity duration-500">
                        <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] hover:scale-110 transition-transform duration-300">
                            Understand Your Documents
                        </h1>
                        <p className="mt-4 text-white/90 text-base sm:text-lg max-w-xl mx-auto">
                            Upload contracts, notices, or official orders, and get clear, simple explanations in plain language.
                        </p>
                        <div className="mt-6">
                            <button onClick={() => setShowBlueModal(true)} className={`${buttonStyle} text-[#3895d3]`}>
                                Start Analyzing
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Case Analysis */}
                <div className="relative h-[50vh] md:h-full flex items-center justify-center bg-gradient-to-br from-[#d9334f] to-[#ff4b2b] hover:scale-105 transition-transform duration-300 glitter-gradient">
                    <div className="px-6 text-center transition-opacity duration-500">
                        <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] hover:scale-110 transition-transform duration-300">
                            Understand Your Case
                        </h1>
                        <p className="mt-4 text-white/90 text-base sm:text-lg max-w-xl mx-auto">
                            Get step-by-step guidance and an AI-powered case summary to understand your legal standing.
                        </p>
                        <div className="mt-6">
                            <button onClick={() => setShowRedModal(true)} className={`${buttonStyle} text-[#E73927]`}>
                                Begin Analysis
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blue Modal for Document Analysis */}
            <Modal show={showBlueModal} onClose={resetBlueModal} color="blue">
                <div className="flex flex-col h-full p-6 pt-14">
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".txt,.pdf" className="hidden" />
                    {showUploadButton && (
                        <div className="flex justify-center items-center h-full">
                            <button onClick={handleUploadClick} className="flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#3895d3] font-bold text-lg sm:text-xl rounded-2xl shadow-xl hover:scale-105 transition-transform">
                                <Upload className="w-6 h-6 sm:w-7 sm:h-7" /> Upload Document
                            </button>
                        </div>
                    )}
                    {isSummarizingDoc && (
                        <div className="flex justify-center items-center h-full text-white">
                            <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                            <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-75 ml-2"></div>
                            <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-150 ml-2"></div>
                            <p className="ml-4 text-lg font-semibold">Analyzing your document...</p>
                        </div>
                    )}
                    {documentSummary && (
                        <div className="p-5 bg-white/20 rounded-2xl text-white overflow-y-auto scrollbar-hide">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"> AI-Powered Insights</h3>
                            <AIResponseRenderer text={documentSummary} />
                            <button onClick={() => { setDocumentSummary(""); setShowUploadButton(true); }} className="mt-6 px-4 py-2 bg-white text-[#3895d3] font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                                Analyze Another Document
                            </button>
                        </div>
                    )}
                </div>
            </Modal>

            {/* Red Modal for Case Analysis */}
            <Modal show={showRedModal} onClose={resetRedModal} color="red">
                <CaseAnalysisFlow
                    categories={caseCategories}
                    onSubmit={handleCaseAnalysisSubmit}
                    aiResponse={aiCaseResponse}
                    isSummarizing={isSummarizingCase}
                    resetFlow={resetRedModal}
                />
            </Modal>

            <ConfirmationModal
                show={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onConfirm={handleFinalConfirmation}
                message="Your case details are ready. We will now generate an AI summary and suggest next steps for you."
            />
        </section>
    );
};


const CaseAnalysisFlow = ({ categories, onSubmit, aiResponse, isSummarizing, resetFlow }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [selectedDocuments, setSelectedDocuments] = useState([]);

    const resetToCategories = () => {
        setCurrentStep(0);
        setSelectedCategory(null);
        setSelectedSubCategory(null);
        setSelectedOption(null);
        setUserAnswers({});
        setSelectedDocuments([]);
    };

    // Handlers to navigate through the flow
    const handleCategorySelect = (cat) => { setSelectedCategory(cat); setCurrentStep(1); };
    const handleSubCategorySelect = (sub) => { setSelectedSubCategory(sub); setCurrentStep(2); };
    const handleOptionSelect = (opt) => {
        setSelectedOption(opt);
        setUserAnswers({});
        setSelectedDocuments([]);
        setCurrentStep(3);
    };
    const handleYesNoSubmit = () => setCurrentStep(4);
    const handleDocumentSubmit = () => {
        onSubmit({
            category: selectedCategory.title,
            subCategory: selectedSubCategory.title,
            option: selectedOption.text,
            answers: userAnswers,
            availableDocs: selectedDocuments,
            missingDocs: selectedOption.documents.filter(doc => !selectedDocuments.includes(doc))
        });
        setCurrentStep(5); // Move to loading/response view
    };

    const cardStyle = "flex flex-col items-center justify-center p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-700 hover:shadow-2xl transition-all hover:scale-105 cursor-pointer text-center";

    return (
        <div className="flex flex-col h-full">
            {/* Header / Breadcrumbs could go here if needed */}
            <div className="flex-grow overflow-y-auto scrollbar-hide p-4 sm:p-6">
                {currentStep === 0 && (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
                        {categories.map((cat, i) => (
                            <div key={i} className={cardStyle} onClick={() => handleCategorySelect(cat)}>
                                <h3 className="text-lg font-bold text-neutral-800 dark:text-white">{cat.title}</h3>
                            </div>
                        ))}
                    </div>
                )}
                {currentStep === 1 && selectedCategory && (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
                        {selectedCategory.subs.map((sub, i) => (
                            <div key={i} className={cardStyle} onClick={() => handleSubCategorySelect(sub)}>
                                <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">{sub.title}</h3>
                            </div>
                        ))}
                    </div>
                )}
                {currentStep === 2 && selectedSubCategory && (
                     <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
                        {selectedSubCategory.options.map((opt, i) => (
                            <div key={i} className={cardStyle} onClick={() => handleOptionSelect(opt)}>
                                <p className="text-sm text-neutral-700 dark:text-neutral-200">{opt.text}</p>
                            </div>
                        ))}
                    </div>
                )}
                 {currentStep === 3 && selectedOption && (
                     <div className="p-5 bg-white/90 dark:bg-neutral-800/90 rounded-2xl shadow-xl animate-fade-in">
                        <h4 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-white">Please answer:</h4>
                        {selectedOption.questions.map((q, i) => (
                             <div key={i} className="flex justify-between items-center p-4 bg-gray-100 dark:bg-neutral-700 rounded-lg mb-2">
                                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{q}</p>
                                <div className="flex gap-2">
                                    <button onClick={() => setUserAnswers({...userAnswers, [q]: true})} className={`px-4 py-1 rounded-md text-sm ${userAnswers[q] === true ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>Yes</button>
                                    <button onClick={() => setUserAnswers({...userAnswers, [q]: false})} className={`px-4 py-1 rounded-md text-sm ${userAnswers[q] === false ? 'bg-red-500 text-white' : 'bg-gray-300'}`}>No</button>
                                </div>
                            </div>
                        ))}
                        <button onClick={handleYesNoSubmit} disabled={Object.keys(userAnswers).length !== selectedOption.questions.length} className="mt-4 px-5 py-2 rounded-xl bg-black text-white disabled:opacity-50">Next</button>
                    </div>
                 )}
                 {currentStep === 4 && selectedOption && (
                    <div className="p-5 bg-white/90 dark:bg-neutral-800/90 rounded-2xl shadow-xl animate-fade-in">
                        <h4 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-white">Select available documents:</h4>
                        {selectedOption.documents.map((doc, i) => (
                            <label key={i} className="flex items-center p-3 bg-gray-100 dark:bg-neutral-700 rounded-lg mb-2">
                                <input type="checkbox" onChange={(e) => {
                                    const checked = e.target.checked;
                                    setSelectedDocuments(prev => checked ? [...prev, doc] : prev.filter(d => d !== doc));
                                }} className="h-5 w-5 text-blue-600 rounded" />
                                <span className="ml-3 text-sm text-neutral-700 dark:text-neutral-200">{doc}</span>
                            </label>
                        ))}
                        <button onClick={handleDocumentSubmit} disabled={selectedDocuments.length === 0} className="mt-4 px-5 py-2 rounded-xl bg-black text-white disabled:opacity-50">Generate AI Summary</button>
                    </div>
                 )}
                {currentStep === 5 && (
                    <div className="p-5 bg-white/90 dark:bg-neutral-800/90 rounded-2xl shadow-xl h-full flex flex-col">
                        <h4 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-white">AI-Powered Case Summary</h4>
                        <div className="flex-grow overflow-y-auto">
                            {isSummarizing ? (
                                <div className="flex justify-center items-center h-full text-neutral-700 dark:text-neutral-200">
                                    <div className="w-4 h-4 bg-neutral-500 rounded-full animate-pulse"></div>
                                    <p className="ml-3">Generating summary...</p>
                                </div>
                            ) : (
                                <AIResponseRenderer text={aiResponse} textColor="text-neutral-700 dark:text-neutral-300" boldColor="text-neutral-800 dark:text-white" bulletColor="text-neutral-500 dark:text-neutral-400" />
                            )}
                        </div>
                        {!isSummarizing && (
                            <button onClick={resetToCategories} className="mt-4 px-4 py-2 bg-black text-white font-semibold rounded-lg self-start">Start New Analysis</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


export default HeroSection;

