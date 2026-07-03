interface NavbarProps {
    pageChangeCallback: (page: string) => void;
}

export default function Navbar( {pageChangeCallback}: NavbarProps ) {

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
            <div 
                className="absolute left-1/2 -translate-x-1/2 text-2xl font-serif font-bold tracking-tight text-white cursor-pointer" 
                onClick={() => pageChangeCallback('Home')}
            >
                TechTrend Analyser
            </div>

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
        </nav>

    );

}