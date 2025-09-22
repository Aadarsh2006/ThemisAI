import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowLeft, Mic } from 'lucide-react';
import { getVoiceCommandResponse } from 'services/geminiService';

const VoiceAssistantPage = ({ onGoBack }) => {
  const [status, setStatus] = useState("idle"); // idle, listening, processing, speaking
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("Hello! How can I assist you today?");
  const recognitionRef = useRef(null);

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = ''; 
    utterance.onstart = () => setStatus("speaking");
    utterance.onend = () => setStatus("idle");
    window.speechSynthesis.speak(utterance);
  };

  const handleCommand = async (command) => {
    const lowerCaseCommand = command.toLowerCase();
    
    if (lowerCaseCommand.includes("go back") || lowerCaseCommand.includes("homepage")) {
      speak("Returning to the homepage.");
      setTimeout(onGoBack, 2000);
    } else {
      setStatus("processing");
      try {
        const aiResponse = await getVoiceCommandResponse(command);
        setResponse(aiResponse);
        speak(aiResponse);
      } catch (error) {
        const errorMsg = "Sorry, an error occurred.";
        setResponse(errorMsg);
        speak(errorMsg);
      }
    }
  };

  const startListening = () => {
    if (status !== "idle" || !('webkitSpeechRecognition' in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = ''; 
    recognitionRef.current = recognition;

    recognition.onstart = () => { setStatus("listening"); setTranscript(""); };
    recognition.onresult = (event) => {
      const receivedTranscript = event.results[0][0].transcript;
      setTranscript(receivedTranscript);
      handleCommand(receivedTranscript);
    };
    recognition.onerror = () => setStatus("idle");
    recognition.onend = () => { if (status === "listening") setStatus("idle"); };
    recognition.start();
  };

  useEffect(() => {
    speak(response); // Speak initial message
    return () => {
      window.speechSynthesis.cancel(); 
      recognitionRef.current?.abort();
    };
  }, []); // Empty dependency array ensures this runs only once on mount
  
  const micButtonColor = useMemo(() => ({
    "listening": "bg-red-500 animate-pulse",
    "processing": "bg-yellow-500",
    "speaking": "bg-blue-500",
    "idle": "bg-green-500"
  }[status]), [status]);
  
  const statusText = useMemo(() => ({
    'listening': 'Listening...',
    'processing': 'Processing...',
    'speaking': 'Speaking...',
    'idle': 'Idle...'
  }[status]), [status]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 p-4">
      <button onClick={onGoBack} className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 rounded-lg shadow-md z-10">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      
      <div className="relative h-[90vh] w-full max-w-5xl bg-white dark:bg-neutral-800 rounded-2xl shadow-xl flex flex-col">
        <div className="p-4 text-center border-b border-black/10 dark:border-white/10">
            <h4 className="text-xl font-bold">Themis Voice Assistant</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">{statusText}</p>
        </div>

        <div className="flex-grow p-4 overflow-y-auto space-y-4 flex flex-col justify-around">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-neutral-700/50">
                <p className="font-semibold text-neutral-500 dark:text-neutral-400">You said:</p>
                <p className="text-lg italic min-h-[3rem]">{transcript || "..."}</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-neutral-700/50">
                <p className="font-semibold text-neutral-500 dark:text-neutral-400">Themis replied:</p>
                <p className="text-lg min-h-[3rem] whitespace-pre-wrap">{response}</p>
            </div>
        </div>

        <div className="p-4 border-t border-black/10 dark:border-white/10 flex justify-center">
            <button
                onClick={startListening}
                disabled={status !== 'idle'}
                className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl transition-all ${micButtonColor}`}
            >
                <Mic className="w-10 h-10" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistantPage;

