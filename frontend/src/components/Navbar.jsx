export default function Navbar() {

    const links = [
        { name: "Home", href: '#' },
        { name: "Archive", href: '#' },
        { name: "About", href: '#' },
    ]

    return(

        <div className='
            fixed top-0 left-0
            h-16 w-full
            px-8
            flex flex-row
            justify-between
            items-center
            bg-amber-600
        '>

            <div className="">
                <p>logo and whatever</p>
            </div>

            <div className="space-x-12">
                <a>Home</a>
                <a>Archive</a>
                <a>About</a>
            </div>

        </div>

    );

}