import "./button.css";

interface type_data{
    text_btn:string, 
    color: string
}

export default function ButtonCreat({text_btn, color}:type_data) {
    const safeColor = ["blue", "green", "red", "yellow"].includes(color)?  color: "gray";
    const className = `btn_ ${safeColor} py-1 px-4 text-white shadow`;
    return (
        <button className={className}>{text_btn}</button>
    );
}