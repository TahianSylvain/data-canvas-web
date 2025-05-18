import "./button.css"

export function Button ({children, className}) {
    return <button className={`py-2 px-2 rounded-md font-bold ${className}`}>{children}</button>    
}
