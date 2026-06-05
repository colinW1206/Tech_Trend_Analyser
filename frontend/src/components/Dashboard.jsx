import React, { useState } from 'react';

import Card from './Card'
import { mockData } from '../mockData';

export default function Dashboard() {

    const [selectedDay, setSelectedDay] = useState("Today");
    const activeTrend = mockData[selectedDay];
    const daysList = Object.keys(mockData);

    const renderButton = (day) => {
        const isActive = selectedDay === day;

        return (
            <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`
                    w-full px-4 py-3
                    text-left text-sm
                    
                    ${isActive
                        ? "bg-amber-600 text-white shadow-md" 
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }
                `}
            >
                {day}
            </button>
        );
    }

    return(

        <main className='
            max-w-7xl mx-auto
            pt-24 px-6 pb-12
        '>
            <div className='
                grid grid-cols-1
                md:grid-cols-3 gap-6
            '>

                <Card className="md:col-span-2">
                    <h1 className="text-xl font-bold">
                        {activeTrend.title}
                    </h1>
                    <p> {activeTrend.content} </p>
                </Card>

                <Card className="md:col-span-1">
                    <h1 className="text-xl font-bold">
                        Recent Trends
                    </h1>

                    <div className="
                        flex flex-col space-y-3
                    ">
                        {daysList.map(renderButton)}
                    </div>

                </Card>

            </div>
        </main>
    );

}