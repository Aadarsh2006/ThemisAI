const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=";
const API_KEY = ""; // Kept empty as it's handled by the environment

async function callGeminiAPI(prompt, signal) {
    try {
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
        const response = await fetch(API_URL + API_KEY, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal,
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const result = await response.json();
        return result.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't get a response.";
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('API call aborted.');
            throw error;
        }
        console.error("Error calling Gemini API:", error);
        throw new Error("An error occurred while fetching the response.");
    }
}

export const summarizeText = (text, signal) => {
    const prompt = `Please summarize the following legal text into simple, easy-to-understand language. Focus on the key points, obligations, and rights mentioned in the document:\n\n${text}`;
    return callGeminiAPI(prompt, signal);
};

export const generateCaseSummary = (details, signal) => {
    const prompt = `Based on the following case details, provide a brief summary and suggest the next logical legal steps.

    Case Details:
    Main Category: ${details.category}
    Sub-Category: ${details.subCategory}
    User Description: ${details.option}
    User Answers: ${JSON.stringify(details.answers)}
    Available Documents: ${details.availableDocs.join(', ')}
    Missing Documents: ${details.missingDocs.join(', ')}
    
    Summary and Next Steps:`;
    return callGeminiAPI(prompt, signal);
};

export const getSimpleChatResponse = (query, signal) => {
    const prompt = `You are a helpful legal assistant. Answer the following question in a clear and concise way. Question: ${query}`;
    return callGeminiAPI(prompt, signal);
};

export const generateLegalDoc = (description) => {
    const prompt = `You are an expert legal assistant in India. Based on the user's request, generate a draft of the following legal document. The document should be clear, professional, and include common clauses relevant to the request. User Request: "${description}"`;
    return callGeminiAPI(prompt);
};

export const generateLegalLetter = (formState) => {
    const prompt = `
        You are an expert legal assistant in India. Draft a formal application to transfer a court case based on the following details. The tone should be formal and respectful.

        **Case Details:** ${formState.caseDetails || 'Not Provided'}
        **Current Court:** ${formState.currentCourt}
        **Applicant's Name:** ${formState.userName || 'The Applicant'}
        **Reason for Transfer Request:**
        ${formState.reasonForTransfer}

        Please structure this as a formal application addressed to the appropriate judicial authority.
    `;
    return callGeminiAPI(prompt);
};

export const getAiCaseStatus = (caseNumber) => {
    const prompt = `
        You are an AI legal assistant simulating a case status check for the Indian judiciary system. The user has provided a case number. Provide a realistic, detailed, and helpful status update.

        **Case Number:** ${caseNumber}

        **Instructions:**
        1.  Acknowledge the case number.
        2.  Provide a **Current Status** (e.g., "Pending for hearing").
        3.  Mention the **Next Hearing Date** (a plausible future date).
        4.  List a **Case History** with 2-3 past events and dates.
        5.  Offer **AI Recommendations** with 2-3 actionable next steps.
        
        Format the response clearly with bold headings.
    `;
    return callGeminiAPI(prompt);
};

export const getCrimeAnalysis = (query) => {
    const prompt = `
        You are an AI legal expert specializing in the Indian Penal Code (IPC). A user is asking about a crime. Provide a clear, structured explanation including:
        1.  **Possible Offense(s):** Identify the potential crime(s).
        2.  **Relevant Legal Sections:** Cite specific sections of the IPC.
        3.  **Explanation:** Explain the laws in simple terms.
        4.  **Potential Consequences:** Detail punishments (fines, imprisonment).
        5.  **Disclaimer:** Conclude that this is not legal advice and a lawyer should be consulted.

        User's Query: "${query}"
    `;
    return callGeminiAPI(prompt);
};

export const getRightsExplanation = (query) => {
    const prompt = `
        You are an AI legal assistant specializing in Indian law. A user is asking about their legal rights. Provide a clear, easy-to-understand explanation.
        
        **Instructions:**
        1.  **Summarize the Rights:** Briefly summarize key rights.
        2.  **Cite Legal Basis:** Mention the primary laws or constitutional articles.
        3.  **Actionable Steps:** Provide a short list of practical steps.
        4.  **Disclaimer:** Add a disclaimer that this is not legal advice.

        User's Query: "${query}"
    `;
    return callGeminiAPI(prompt);
};

export const generateHearingPrepSheet = (caseType, hearingDetails) => {
    const prompt = `
        You are an AI legal assistant in India. A user needs help preparing for a court hearing. Based on their inputs, generate a concise preparation guide.
        
        **Instructions:**
        1.  **Document Checklist:** Create a bulleted list of essential documents.
        2.  **Potential Questions:** List 3-5 potential questions from the judge or opposing counsel.
        3.  **Courtroom Etiquette:** Provide a short, bulleted list of key tips for conduct.
        4.  **Disclaimer:** State this is a general guide, not legal advice.

        **User's Case Type:** ${caseType}
        **Hearing Details/Stage:** ${hearingDetails}
    `;
    return callGeminiAPI(prompt);
};

export const getVoiceCommandResponse = (command) => {
     const prompt = `You are Themis, an expert AI legal assistant. A user is asking you a question via voice. Respond clearly and accurately in the same language as the user's question. User's question: "${command}"`;
     return callGeminiAPI(prompt);
};
