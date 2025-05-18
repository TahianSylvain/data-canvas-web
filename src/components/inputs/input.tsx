import "./input.css"


export function Input ({label, id, input_type, className} : {label: string, id: string, input_type: string, className: string}) {
    return <div className={"input " + className}>
        <label htmlFor={id}>{label}</label>
        <input className="text-xl p-2 mt-2" type={input_type} id={id} name={id} />
    </div>
    
}
