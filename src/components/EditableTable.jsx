"use client";
import { useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

const defaultData = [
  {
    id: 1,
    task: "Develop feature A",
    status: "In Progress",
    features: "User authentication",
    description: "Implement JWT authentication for users",
    launchdate: "2025-04-15",
    owner: "John Doe",
    launchname: "Spring Release",
  },
  {
    id: 2,
    task: "Bug Fix #234",
    status: "Completed",
    features: "UI Improvements",
    description: "Fix the alignment issue on the dashboard",
    launchdate: "2025-03-28",
    owner: "Jane Smith",
    launchname: "March Patch",
  },
  {
    id: 3,
    task: "Optimize Database Queries",
    status: "Pending",
    features: "Performance",
    description: "Improve SQL queries for faster response time",
    launchdate: "2025-05-10",
    owner: "Alice Johnson",
    launchname: "Performance Update",
  },
  {
    id: 4,
    task: "Add Dark Mode",
    status: "In Progress",
    features: "User Experience",
    description: "Implement dark mode toggle for better usability",
    launchdate: "2025-04-20",
    owner: "Bob Williams",
    launchname: "UI Update",
  },
];


export default function Spreadsheet() {
  const [data, setData] = useState(defaultData);

  const [columns, setColumns] = useState([
    {
      accessorKey: "launchname",
      header: "Launch name",
      cell: EditableCell,
    },
    {
      accessorKey: "launchdate",
      header: "Launch date",
      cell: DateCell,
    },
    {
      accessorKey: "owner",
      header: "Owner",
      cell: EditableCell,
    },
    {
      accessorKey: "task",
      header: "Task",
      cell: EditableCell,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: SelectCell,
      options: ["Active", "Inactive", "Pending"],
    },
    {
      accessorKey: "features",
      header: "Features",
      cell: EditableCell,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: EditableCell,
    },
  ]);

  const table = useReactTable({
    data,
    columns: [
      ...columns,
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <button
            onClick={() => deleteRow(row.original.id)}
            className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Delete
          </button>
        ),
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  const addRow = () => {
    const newRow = { id: data.length + 1 };
    columns.forEach((col) => {
      newRow[col.accessorKey] = "";
    });
    setData([...data, newRow]);
  };

  const deleteRow = (id) => {
    setData(data.filter((row) => row.id !== id));
  };

  const [newColumnName, setNewColumnName] = useState("");
  const [newColumnType, setNewColumnType] = useState("text");
  const [isAddingColumn, setIsAddingColumn] = useState(false);

  const addColumn = () => {
    setIsAddingColumn(true);
  };

  const [newColumnOptions, setNewColumnOptions] = useState("");

  const handleColumnNameEnter = (e) => {
    if (e.key === "Enter" && newColumnName.trim() !== "") {
      let newCell;
      let newColumn = {
        accessorKey: newColumnName.toLowerCase().replace(/\s+/g, "_"),
        header: newColumnName,
      };
  
      if (newColumnType === "text") {
        newCell = EditableCell;
      } else if (newColumnType === "select") {
        newCell = SelectCell;
        newColumn.options = newColumnOptions.split(",").map((opt) => opt.trim());
      } else if (newColumnType === "date") {
        newCell = DateCell;
      }
  
      newColumn.cell = newCell;
      setColumns([...columns, newColumn]);
  
      setData(data.map(row => ({ ...row, [newColumn.accessorKey]: "" })));
      setNewColumnName("");
      setNewColumnType("text");
      setNewColumnOptions("");
      setIsAddingColumn(false);
    }
  };

  const deleteColumn = (accessorKey) => {
    setColumns(columns.filter(col => col.accessorKey !== accessorKey));
    setData(data.map(row => {
      const newRow = { ...row };
      delete newRow[accessorKey];
      return newRow;
    }));
  };

  return (
    
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <table className="w-full border-collapse border border-gray-300 text-sm text-gray-800">
        <thead>
          <tr className="bg-gray-100 text-gray-700 font-semibold">
            {columns.map((col) => (
              <th key={col.accessorKey} className="border p-3 text-left relative bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <span>{col.header}</span>
                  <button onClick={() => deleteColumn(col.accessorKey)} className="text-red-500 hover:text-red-700 ml-2">-</button>
                </div>
              </th>
            ))}
            {isAddingColumn && (
              <th className="border p-3 text-left bg-gray-200">
                <input
                  type="text"
                  className="w-full px-2 py-1 border rounded mb-1"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  onKeyDown={handleColumnNameEnter}
                  autoFocus
                  placeholder="Column Name"
                />
                <select
                  className="w-full px-2 py-1 border rounded"
                  value={newColumnType}
                  onChange={(e) => setNewColumnType(e.target.value)}
                >
                  <option value="text">Text</option>
                  <option value="select">Select</option>
                  <option value="date">Date</option>
                </select>
                {newColumnType === "select" && (
                  <input
                    type="text"
                    className="w-full px-2 py-1 border rounded mt-1"
                    value={newColumnOptions}
                    onChange={(e) => setNewColumnOptions(e.target.value)}
                    placeholder="Options (comma separated)"
                  />
                )}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id} className={rowIndex % 2 === 0 ? "bg-white hover:bg-gray-100 transition-colors duration-200" : "bg-gray-50 hover:bg-gray-100 transition-colors duration-200"}>
              {columns.map((col) => (
                <td key={col.accessorKey} className="border p-3">
                  {flexRender(col.cell, { getValue: () => row[col.accessorKey], row, column: col, setData })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex space-x-2">
        <button onClick={addRow} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add Row
        </button>
        <button onClick={addColumn} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200">
          Add Column
        </button>
      </div>
    </div>
  );
}

function EditableCell({ getValue, row, column, setData }) {
  const [value, setValue] = useState(getValue());
  return <input type="text" value={value} onChange={(e) => setValue(e.target.value)} onBlur={() => setData((prev) => prev.map(r => r.id === row.id ? { ...r, [column.accessorKey]: value } : r))} className="border px-2 py-1 w-full" />;
}

function DateCell({ getValue, row, column, setData }) {
  const [value, setValue] = useState(getValue());
  return <input type="date" value={value} onChange={(e) => setValue(e.target.value)} onBlur={() => setData((prev) => prev.map(r => r.id === row.id ? { ...r, [column.accessorKey]: value } : r))} className="border px-2 py-1 w-full" />;
}

function SelectCell({ getValue, row, column, setData }) {
  const [value, setValue] = useState(getValue());
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)} onBlur={() => setData((prev) => prev.map(r => r.id === row.id ? { ...r, [column.accessorKey]: value } : r))} className="border px-2 py-1 w-full">
      {column.options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}

