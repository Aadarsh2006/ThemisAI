import React from 'react';

const AIResponseRenderer = ({ text, textColor = "text-white/95", boldColor = "text-white", bulletColor = "text-white/70" }) => {
    if (!text) return null;

    const renderLine = (line) => {
        // This regex handles **bold** text and preserves nested formatting
        line = line.replace(/\*\*(.*?)\*\*/g, `<strong class="font-semibold ${boldColor}">$1</strong>`);
        return line;
    };

    const blocks = [];
    let currentListType = null;
    let listItems = [];

    const flushList = () => {
        if (currentListType && listItems.length > 0) {
            blocks.push({ type: currentListType, items: [...listItems] });
        }
        currentListType = null;
        listItems = [];
    };
    
    const lines = text.split('\n');

    lines.forEach(line => {
        const trimmedLine = line.trim();
        
        if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
            if (currentListType !== 'ul') {
                flushList();
                currentListType = 'ul';
            }
            listItems.push(trimmedLine.substring(2));
        } 
        else if (/^\d+\.\s/.test(trimmedLine)) {
            if (currentListType !== 'ol') {
                flushList();
                currentListType = 'ol';
            }
            listItems.push(trimmedLine.replace(/^\d+\.\s/, ''));
        } 
        else {
            flushList();
            blocks.push({ type: 'p', content: line });
        }
    });

    flushList();

    return (
        <div className={`font-sans text-sm ${textColor} space-y-4`}>
            {blocks.map((block, index) => {
                if (block.type === 'p') {
                    const trimmedContent = block.content.trim();
                    if (trimmedContent === '') return null;
                    if (trimmedContent === '---' || trimmedContent === '***' || trimmedContent === '___') {
                        return <hr key={index} className="my-6 border-white/20" />;
                    }
                    if (trimmedContent.startsWith('> ')) {
                        return (
                            <blockquote key={index} className="pl-4 border-l-4 border-white/30 italic text-white/80">
                                <p dangerouslySetInnerHTML={{ __html: renderLine(trimmedContent.substring(2)) }} />
                            </blockquote>
                        );
                    }
                    if (trimmedContent.startsWith('**') && trimmedContent.endsWith('**') && trimmedContent.length > 4 && !trimmedContent.slice(2, -2).includes('**')) {
                         return <h4 key={index} className={`text-lg font-bold mb-2 mt-4 ${boldColor}`}>{trimmedContent.slice(2, -2)}</h4>;
                    }
                    return <p key={index} dangerouslySetInnerHTML={{ __html: renderLine(block.content) }} />;
                }

                if (block.type === 'ul') {
                    return (
                        <ul key={index} className={`list-disc pl-8 space-y-2 ${bulletColor}`}>
                            {block.items.map((item, i) => (
                                <li key={`${index}-${i}`} className="pl-2" dangerouslySetInnerHTML={{ __html: renderLine(item) }} />
                            ))}
                        </ul>
                    );
                }

                if (block.type === 'ol') {
                    return (
                        <ol key={index} className={`list-decimal pl-8 space-y-2 ${bulletColor}`}>
                            {block.items.map((item, i) => (
                                <li key={`${index}-${i}`} className="pl-2" dangerouslySetInnerHTML={{ __html: renderLine(item) }} />
                            ))}
                        </ol>
                    );
                }

                return null;
            })}
        </div>
    );
};

export default AIResponseRenderer;
