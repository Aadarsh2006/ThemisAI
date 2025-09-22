import React from 'react';
import { FileText, Sparkles, Search, Shield, BookUser, ClipboardCheck } from 'lucide-react';

const ServicesGrid = ({ openModal }) => {
    const cardStyle = "flex flex-col items-center justify-center p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-700 hover:shadow-2xl transition-all hover:scale-105 cursor-pointer text-center";
    
    const services = [
        { id: 'docGen', icon: <FileText className="w-12 h-12 text-blue-500 mb-4" />, title: "Minor Easy Drafting", description: "Draft simple legal documents with AI assistance." },
        { id: 'letterDrafter', icon: <Sparkles className="w-12 h-12 text-red-500 mb-4" />, title: "Legal Letter Drafting", description: "Generate formal letters and applications with AI." },
        { id: 'caseStatus', icon: <Search className="w-12 h-12 text-purple-500 mb-4" />, title: "Case Status Tracker", description: "Get AI-powered updates and recommendations on your case." },
        { id: 'crime', icon: <Shield className="w-12 h-12 text-green-500 mb-4" />, title: "Crime and Consequences", description: "Understand the legal consequences of criminal offenses." },
        { id: 'rightsExplainer', icon: <BookUser className="w-12 h-12 text-yellow-500 mb-4" />, title: "Know Your Rights", description: "Ask about your rights in any situation and get clear answers." },
        { id: 'hearingPrep', icon: <ClipboardCheck className="w-12 h-12 text-orange-500 mb-4" />, title: "Hearing Prep Assistant", description: "Get a checklist and tips for your upcoming court hearing." },
    ];

    return (
        <section className="py-16 bg-gray-100 dark:bg-neutral-800/50">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-neutral-800 dark:text-white">
                    More Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map(service => (
                        <div key={service.id} onClick={() => openModal(service.id)} className={cardStyle}>
                            {service.icon}
                            <h3 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-white">{service.title}</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-300 text-center">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;
