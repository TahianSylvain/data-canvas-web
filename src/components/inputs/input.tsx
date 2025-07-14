import "./input.css"
import React from "react"

type InputProps = {
  label: string
  id: string
  input_type: string
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

export function Input({
  label,
  id,
  input_type,
  className = "",
  value,
  onChange,
  placeholder,
}: InputProps) {
  return (
    <div className={"input " + className}>
      <label htmlFor={id}>{label}</label>
      <input
        className="text-xl p-2 mt-2"
        type={input_type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}

