import { summarizeText } from '../services/geminiService';

const extractTextFromPdf = async (typedarray, signal) => {
    try {
        if (!window.pdfjsLib) {
            throw new Error("pdf.js library is not loaded.");
        }
        const pdf = await window.pdfjsLib.getDocument(typedarray).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            if (signal.aborted) throw new Error('AbortError');
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            fullText += textContent.items.map(item => item.str).join(' ');
        }
        return fullText;
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error('Error parsing PDF:', error);
        }
        throw error;
    }
};

export const extractTextFromFile = async (file, setSummary, setIsLoading, signal) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
        let text = '';
        try {
            if (file.type === "application/pdf") {
                const typedarray = new Uint8Array(e.target.result);
                text = await extractTextFromPdf(typedarray, signal);
            } else {
                text = e.target.result;
            }

            if (text) {
                const summary = await summarizeText(text, signal);
                setSummary(summary);
            } else {
                setSummary("Could not extract text from the document.");
            }
        } catch (error) {
             if (error.name !== 'AbortError') {
                setSummary("An error occurred while processing the document.");
             }
        } finally {
            if (!signal.aborted) {
                setIsLoading(false);
            }
        }
    };

    if (file.type === "application/pdf") {
        reader.readAsArrayBuffer(file);
    } else {
        reader.readAsText(file);
    }
};
