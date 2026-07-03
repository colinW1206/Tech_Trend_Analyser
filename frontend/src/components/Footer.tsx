export default function Footer() {
    
    return(
        <footer className='
            w-full
            border-t border-gray-300
            py-8 mt-12 text-charcoal-light
        '>
            <div className='
                max-w-7xl mx-auto px-6
                flex flex-col md:flex-row justify-between items-center
                text-sm font-medium
            '>
                <p>&copy; {new Date().getFullYear()} TechTrend Analyser. Built by Colin W.</p>
                
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <a 
                        href="https://github.com/colinW1206" 
                        target="_blank" 
                        rel="noreferrer"
                        className="hover:text-brand transition-colors flex items-center gap-2"
                    >
                        
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
        </footer>
    );

}