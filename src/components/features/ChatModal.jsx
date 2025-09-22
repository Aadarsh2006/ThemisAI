import React, { useState, useEffect, useRef } from 'react';
import { Send, X } from 'lucide-react';
import { getSimpleChatResponse } from '../../services/geminiService';
import AIResponseRenderer from '../common/AIResponseRenderer';

const ChatModal = ({ show, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const abortControllerRef = useRef(null);

    useEffect(() => {
        if (show) {
            setMessages([{ text: "Hello! I am your AI Legal Assistant. How can I help you today?", fromUser: false }]);
        } else {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        }
    }, [show]);

    const sendMessage = async () => {
        if (input.trim() === "" || isLoading) return;
        
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;
        
        const userMessage = { text: input, fromUser: true };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        const userQuery = input;
        setInput("");
        setIsLoading(true);

        try {
            const aiResponse = await getSimpleChatResponse(userQuery, signal);
            if (aiResponse) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: aiResponse, fromUser: false },
                ]);
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                 setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "An error occurred. Please try again.", fromUser: false },
                ]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !isLoading) {
            sendMessage();
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                className={`relative h-[90vh] w-[92%] sm:w-[90%] max-w-5xl bg-white dark:bg-neutral-800 rounded-2xl shadow-xl animate-glow-halo transform transition-transform duration-300 ${show ? 'scale-100' : 'scale-95'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="h-full flex flex-col">
                    <div className="p-4 pr-12 bg-transparent border-b border-black/10 dark:border-white/10 flex-shrink-0">
                        <h4 className="text-xl font-bold text-neutral-800 dark:text-white">Themis AI Assistant</h4>
                    </div>
                    <div className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-hide">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.fromUser ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] sm:max-w-[70%] p-3 rounded-xl shadow-sm ${msg.fromUser ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}>
                                    <AIResponseRenderer text={msg.text} />
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="max-w-[80%] sm:max-w-[70%] p-3 rounded-xl shadow-sm bg-red-500">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse delay-75"></div>
                                        <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse delay-150"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 bg-transparent border-t border-black/10 dark:border-white/10 flex items-center gap-2 flex-shrink-0">
                        <input
                            type="text"
                            className="flex-grow p-3 rounded-xl border-2 bg-gray-100 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 focus:outline-none hover:border-blue-500 focus:border-red-500 transition-colors duration-300 text-neutral-800 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
                            placeholder="Ask legal related queries"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                        />
                        <button onClick={sendMessage} className="p-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors active:bg-red-500 disabled:opacity-50" disabled={isLoading}>
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <button className="absolute top-3 right-3 p-2 transition-all duration-300 rounded-full group z-10" onClick={onClose}>
                    <X className="w-6 h-6 transition-colors duration-300 text-neutral-500 dark:text-neutral-400 group-hover:text-blue-500 group-active:text-red-500" />
                </button>
            </div>
        </div>
    );
};

export default ChatModal;

