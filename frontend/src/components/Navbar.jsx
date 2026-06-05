export default function Navbar( {pageChangeCallback} ) {

    const links = [
        { name: "Home", href: '#' },
        { name: "Archive", href: '#' },
        { name: "About", href: '#' },
    ];

    const linkClass = "text-slate-200 hover:text-amber-300 font-medium text-sm transition-colors duration-200 cursor-pointer";

    return(

        <div className='
            fixed top-0 left-0
            h-16 w-full
            px-8
            flex flex-row
            justify-between
            items-center
            bg-amber-600
            border-b-2
            border-amber-700
        '>

            <div className="text-xl font-bold">
                <p>(Placeholder for Logo) Tech Trend Analyser</p>
            </div>

            <div className="space-x-12">
                {links.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className={linkClass}
                        onClick={() => pageChangeCallback(link.name)}
                    >
                        {link.name}
                    </a>
                ))}
            </div>

        </div>

    );

}