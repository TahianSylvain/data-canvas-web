'use client'
import React from "react";
import "./button.css";

interface type_data{
    text_btn:string, 
    color: string,
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function ButtonCreat({text_btn, color, handleClick}:type_data) {
    const safeColor = ["blue", "green", "red", "yellow"].includes(color)?  color: "gray";
    const className = `btn_ ${safeColor} py-1 px-4 text-white font-bold shadow`;

    

    return (
        <button className={`${className} hover:saturate-150`} onClick={handleClick}>{text_btn}</button>
    );
}