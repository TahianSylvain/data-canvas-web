'use client'
import { useState } from "react";
import "./button.css";

interface type_data{
    text_btn:string, 
    color: string
}

export default function ButtonCreat({text_btn, color}:type_data) {
    const [visibility, setVisibility] = useState("hidden");
    const safeColor = ["blue", "green", "red", "yellow"].includes(color)?  color: "gray";
    const className = `btn_ ${safeColor} py-1 px-4 text-white shadow`;

    const handleClick = ()=>{
        alert('Click '+visibility);
        setVisibility(visibility!='visible'? 'hidden':'visible')
    }

    return (
        <button className={className} onClick={handleClick}>{text_btn}</button>
    );
}