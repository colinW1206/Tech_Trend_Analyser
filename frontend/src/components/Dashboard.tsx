import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'

import Card from './Card'

interface Summary {
    id: number;
    date: string;
    summary_title: string;
    summary_markdown: string;
}

export default function Dashboard() {

    const [summaries, setSummaries] = useState<Summary[]>([]);
    const [loading, setLoading] = useState(true);

    const[selectedIndex, setSelectedIndex] = useState(0);

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
            weekday: 'short', month: 'short', day: 'numeric'
        });
    }


    const renderButton = (summary: Summary, index: number) => {
        const isActive = selectedIndex === index;
        return (
            <button
                key={summary.id}
                onClick={() => setSelectedIndex(index)}
                className={`
                    w-full px-4 py-3
                    text-left text-sm transition-colors
                    
                    ${isActive
                        ? "bg-brand text-white shadow-md border-transparent" 
                        : "bg-white text-charcoal hover:bg-slate-50 border-gray-200"
                    }
                `}
            >
                {formatDate(summary.date)}
            </button>
        );
    }

    if (loading) {
        return <div className="text-center pt-32 text-charcoal">Loading latest trends...</div>
    }

    if (summaries.length === 0) {
        return <div className="text-center pt-32 text-charcoal">No trends found in database.</div>
    }

    const activeTrend = summaries[selectedIndex];

    return(

        <main className='
            max-w-7xl mx-auto
            pt-32 px-6 pb-20
        '>
            <div className='
                grid grid-cols-1
                md:grid-cols-3 gap-6
            '>

                <Card className="md:col-span-2">
                    <h1 className="text-4xl font-serif font-bold tracking-tight mb-8 pb-6 border-b border-gray-200 text-charcoal">
                        {activeTrend.summary_title}
                    </h1>
                    
                    <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-brand hover:prose-a:text-brand-light prose-strong:text-charcoal text-charcoal-light leading-relaxed">
                        <ReactMarkdown>{activeTrend.summary_markdown}</ReactMarkdown>
                    </div>
                </Card>

                <Card className="md:col-span-1 h-fit sticky top-32">
                    <h1 className="text-sm font-bold tracking-widest uppercase text-charcoal-light mb-6">
                        Recent Reports
                    </h1>
                    <div className="flex flex-col space-y-3">
                        {summaries.slice(0, 7).map((summary, index) => renderButton(summary, index))}
                    </div>
                </Card>

            </div>
        </main>
    );

}