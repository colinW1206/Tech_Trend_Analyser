import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Card from './Card';

interface Summary {
    id: string;
    date: string;
    summary_title: string;
    summary_markdown: string;
}

export default function Archive() {
    const [summaries, setSummaries] = useState<Summary[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/summaries')
            .then(response => response.json())
            .then(data => {
                setSummaries(data);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching summaries:", error));
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    const toggleAccordion = (id: string) => {
        if (expandedId === id) {
            setExpandedId(null);
        } else {
            setExpandedId(id);
        }
    };

    if (loading) {
        return <div className="text-center pt-32 text-charcoal">Loading archives...</div>;
    }

    if (summaries.length === 0) {
        return <div className="text-center pt-32 text-charcoal">No archives found.</div>;
    }

    return(
        <main className="max-w-5xl mx-auto pt-32 px-6 pb-20">
            <div className="mb-12">
                <h1 className="text-4xl font-serif font-bold tracking-tight text-charcoal mb-4">Archive</h1>
                <p className="text-charcoal-light text-lg">Browse past articles.</p>
            </div>

            <div className="flex flex-col space-y-6">
                {summaries.map((summary) => {
                    const isExpanded = expandedId === summary.id;
                    return (
                        <Card key={summary.id} className="transition-all duration-300">
                            <div 
                                className="flex flex-row justify-between items-center cursor-pointer"
                                onClick={() => toggleAccordion(summary.id)}
                            >
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-charcoal group-hover:text-brand transition-colors">
                                        {summary.summary_title}
                                    </h2>
                                    <p className="text-charcoal-light text-sm mt-1">{formatDate(summary.date)}</p>
                                </div>
                                <div className="text-brand flex-shrink-0 ml-4">
                                    <svg 
                                        className={`w-6 h-6 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {isExpanded && (
                                <div className="mt-8 pt-8 border-t border-gray-200 animate-fade-in">
                                    <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-brand hover:prose-a:text-brand-light prose-strong:text-charcoal text-charcoal-light leading-relaxed">
                                        <ReactMarkdown>{summary.summary_markdown}</ReactMarkdown>
                                    </div>
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
        </main>
    );
}