import React from 'react';

const Footer = () => {
    return (
        <>
            <section className="py-16 bg-white dark:bg-neutral-900">
                <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center">
                    <h2 className="text-4xl font-bold mb-4 text-neutral-800 dark:text-white">About Themis</h2>
                    <p className="text-lg max-w-2xl mx-auto mb-8 text-neutral-600 dark:text-neutral-300">
                        Themis is an AI platform that makes India's legal system accessible. It provides clear guidance, simple procedures, and essential resources. Our goal is to help every citizen understand and resolve legal issues.
                    </p>
                    <div>
                        <h3 className="text-2xl font-bold text-neutral-800 dark:text-white">Contact Us</h3>
                        <p className="mt-2 text-neutral-600 dark:text-neutral-300">Email: support@themisai.com</p>
                    </div>
                </div>
            </section>
            <footer className="w-full py-6 text-center text-xs text-neutral-600 dark:text-neutral-400 border-t border-black/10 dark:border-white/10">
                © {new Date().getFullYear()} Themis. All rights reserved.
            </footer>
        </>
    );
};

export default Footer;
