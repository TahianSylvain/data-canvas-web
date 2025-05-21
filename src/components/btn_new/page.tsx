'use client'
import "./button.css";

interface type_data{
    text_btn:string, 
    color: string,
    handleClick: () => void
}

export default function ButtonCreat({text_btn, color, handleClick}:type_data) {
    const safeColor = ["blue", "green", "red", "yellow"].includes(color)?  color: "gray";
    const className = `btn_ ${safeColor} py-1 px-4 text-white shadow`;

    

    return (
        <button className={className} onClick={handleClick}>{text_btn}</button>
    );
}