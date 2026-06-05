export default function Footer( { children, className = "" }) {
    
    return(
        <div className={`
            w-full h-20
            p-6 bg-slate-300
            ${className}
        `}>
            {children}
        </div>
    );

}