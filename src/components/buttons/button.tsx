'use client'

import "./button.css"
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

export function Button ({children, className, ...rest}: ButtonProps) {
    return <button className={`py-2 px-2 rounded-md font-bold ${className}`} {...rest}>{children}</button>    
}
