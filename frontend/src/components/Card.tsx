import React, { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export default function Card({ children, className = '' }: CardProps) {

    return(
        <div className={`p-8 editorial-card editorial-card-hover ${className}`}>
            {children}
        </div>
    );

}