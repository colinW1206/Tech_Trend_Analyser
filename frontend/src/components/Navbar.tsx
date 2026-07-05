import { useState } from 'react';

interface NavbarProps {
    pageChangeCallback: (page: string) => void;
}

export default function Navbar( {pageChangeCallback}: NavbarProps ) {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "Home", href: '#' },
        { name: "Archive", href: '#' },
        { name: "About", href: '#' },
    ];

    const linkClass = "text-white/90 hover:text-white font-medium text-sm transition-colors duration-200 cursor-pointer tracking-wide";

    return(
        <nav className='
            fixed top-0 left-0
            h-20 w-full
            px-8 md:px-16
            flex flex-row
            justify-end
            items-center
            bg-brand
            border-b-4
            border-brand-dark
            shadow-md
            z-50
        '>
            {/* Title */}
            <div 
                className="absolute left-1/2 -translate-x-1/2 text-2xl font-serif font-bold tracking-tight text-white cursor-pointer" 
                onClick={() => pageChangeCallback('Home')}
            >
                TechTrend Analyser
            </div>

            {/* Desktop Links */}
            <div className="space-x-8 md:space-x-12 hidden md:flex">
                {links.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className={linkClass}
                        onClick={(e) => { e.preventDefault(); pageChangeCallback(link.name); }}
                    >
                        {link.name}
                    </a>
                ))}
            </div>

            {/* Mobile */}
            <button 
                className="md:hidden text-white hover:text-amber-100 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-20 left-0 w-full bg-brand-light border-b-4 border-brand-dark shadow-lg md:hidden flex flex-col items-center py-6 space-y-6">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`${linkClass} text-lg`}
                            onClick={(e) => { 
                                e.preventDefault(); 
                                pageChangeCallback(link.name);
                                setIsOpen(false);
                            }}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
}