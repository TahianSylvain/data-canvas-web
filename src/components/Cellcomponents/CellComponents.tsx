import { useState } from "react";
export function ShowCell ({ getValue, row, column, setData }) {
  const [value, setValue] = useState(getValue());
   return <input type="text" value={value} onChange={(e) => setValue(e.target.value)} onBlur={() => setData((prev) => prev.map(r => r.id === row.id ? { ...r, [column.accessorKey]: value } : r))}  className="bg-transparent px-2 py-1 w-full" readOnly/>;
}
export function EditableCell({ getValue, row, column, setData }) {
  const [value, setValue] = useState(getValue());
  return <input type="text" value={value} onChange={(e) => setValue(e.target.value)} onBlur={() => setData((prev) => prev.map(r => r.id === row.id ? { ...r, [column.accessorKey]: value } : r))} className="bg-transparent px-2 py-1 w-full" />;
}

export function DateCell({ getValue, row, column, setData }) {
  const [value, setValue] = useState(getValue());
  return <input type="date" value={value} onChange={(e) => setValue(e.target.value)} onBlur={() => setData((prev) => prev.map(r => r.id === row.id ? { ...r, [column.accessorKey]: value } : r))}  className="bg-transparent px-2 py-1 w-full"/>;
}

export function SelectCell({ getValue, row, column, setData }) {
  const [value, setValue] = useState(getValue());
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)} onBlur={() => setData((prev) => prev.map(r => r.id === row.id ? { ...r, [column.accessorKey]: value } : r))} className="bg-transparent px-2 py-1 w-full">
      {column.options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}