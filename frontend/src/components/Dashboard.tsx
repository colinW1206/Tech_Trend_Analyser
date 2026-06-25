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
                        ? "bg-amber-600 text-white shadow-md rounded-md" 
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-md"
                    }
                `}
            >
                {formatDate(summary.date)}
            </button>
        );
    }

    if (loading) {
        return <div className="text-center pt-32 text-white">Loading latest trends...</div>
    }

    if (summaries.length === 0) {
        return <div className="text-center pt-32 text-white">No trends found in database.</div>
    }

    const activeTrend = summaries[selectedIndex];

    return(

        <main className='
            max-w-7xl mx-auto
            pt-24 px-6 pb-12
        '>
            <div className='
                grid grid-cols-1
                md:grid-cols-3 gap-6
            '>

                <Card className="md:col-span-2 bg-slate-900 border-slate-800 text-slate-200">
                    <h1 className="text-3xl font-bold mb-6 pb-4 border-b border-slate-800">
                        {activeTrend.summary_title}
                    </h1>
                    
                    <div className="prose prose-invert prose-amber max-w-none">
                        <ReactMarkdown>{activeTrend.summary_markdown}</ReactMarkdown>
                    </div>
                </Card>

                <Card className="md:col-span-1 bg-slate-900 border-slate-800">
                    <h1 className="text-xl font-bold text-white mb-4">
                        Recent Trends
                    </h1>
                    <div className="flex flex-col space-y-3">
                        {summaries.map((summary, index) => renderButton(summary, index))}
                    </div>
                </Card>

            </div>
        </main>
    );

}