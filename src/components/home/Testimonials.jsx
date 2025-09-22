import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { testimonials } from '../../data/testimonialsData';

const Testimonials = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrent(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(slideInterval);
    }, []);

    const prev = () => setCurrent(c => (c === 0 ? testimonials.length - 1 : c - 1));
    const next = () => setCurrent(c => (c === testimonials.length - 1 ? 0 : c + 1));

    return (
        <section className="py-12 bg-gradient-to-r from-[#d9334f] to-[#ff4b2b] glitter-gradient">
            <div className="max-w-3xl mx-auto px-6 sm:px-12 relative">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                    What Our Clients Say
                </h2>
                <div className="relative h-64 overflow-hidden">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === current ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center h-full">
                                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300 italic mb-4 flex-grow flex items-center">
                                    "{t.quote}"
                                </p>
                                <div className="mt-auto">
                                    <p className="font-bold text-neutral-900 dark:text-white">- {t.name}</p>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={prev} className="absolute top-1/2 -left-4 sm:-left-20 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full transition-all hover:scale-125">
                    <ArrowLeft className="w-10 h-10" />
                </button>
                <button onClick={next} className="absolute top-1/2 -right-4 sm:-right-20 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full transition-all hover:scale-125">
                    <ArrowRight className="w-10 h-10" />
                </button>
            </div>
        </section>
    );
};

export default Testimonials;
