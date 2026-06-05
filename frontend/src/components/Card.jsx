import React from 'react';

export default function Card({ children, className = '' }) {

    return(
        <div className={`
            p-6
            bg-slate-100
            ${className}
        `}>
            {children}
        </div>
    );

}