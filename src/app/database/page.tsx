'use client';
import { useState } from "react";
import { EditableCell, DateCell, SelectCell } from '@/components/Cellcomponents/CellComponents';
import EditableTable from "@/components/EditableTable/EditableTable";
import Header from "@/components/header/header";
import SensorOscillatorPlot from '@/components/Plot/stochastic';


// const emptycolumn = [];
// const emptydata = [];

// eos.com                    IoT: data-analytics
{/* 
  import { NextResponse } from 'next/server';
  async function getSensorData(sensorId) {
    // This will call your Next.js API route
    const res = await fetch(`http://localhost:3000/api/sensor/${sensorId}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch sensor data: ${res.statusText}`);
    }
    return res.json();
*/}

const soilMoistureDataset = {
    // ... paste the entire JSON dataset generated above here ...
    "errors": [],
    "result": [
        {
            "id": 1,
            "view_id": "soilmoisture/sm_250m_20230601_usa",
            "launchdate": "2023-06-01",
            "max": 21.0,
            "min": 20.1,
            "std": 0.29,
            "median": 20.8,
            "average": 20.70,
            "variance": 0.88,
        },
        {
            "id": 2,
            "view_id": "soilmoisture/sm_250m_20230602_usa",
            "launchdate": "2023-06-02",
            "max": 21.8,
            "min": 20.7,
            "std": 0.35,
            "median": 21.2,
            "average": 21.30,
            "variance": 0.12,
        },
        {
            "id": 3,
            "view_id": "soilmoisture/sm_250m_20230603_usa",
            "launchdate": "2023-06-03",
            "max": 21.5,
            "min": 20.5,
            "std": 0.28,
            "median": 21.0,
            "average": 21.10,
            "variance": 0.08,
        },
        {
            "id": 4,
            "view_id": "soilmoisture/sm_250m_20230604_usa",
            "launchdate": "2023-06-04",
            "max": 21.2,
            "min": 20.3,
            "std": 0.25,
            "median": 20.8,
            "average": 20.90,
            "variance": 0.07,
        },
        {
            "id": 5,
            "view_id": "soilmoisture/sm_250m_20230605_usa",
            "launchdate": "2023-06-05",
            "max": 21.9,
            "min": 20.8,
            "std": 0.33,
            "median": 21.4,
            "average": 21.50,
            "variance": 0.11,
        },
        {
            "id": 6,
            "view_id": "soilmoisture/sm_250m_20230606_usa",
            "launchdate": "2023-06-06",
            "max": 22.8,
            "min": 21.7,
            "std": 0.38,
            "median": 22.3,
            "average": 22.40,
            "variance": 0.14,
        },
        {
            "id": 7,
            "view_id": "soilmoisture/sm_250m_20230607_usa",
            "launchdate": "2023-06-07",
            "max": 23.3,
            "min": 22.2,
            "std": 0.36,
            "median": 22.8,
            "average": 22.90,
            "variance": 0.13,
        },
        {
            "id": 8,
            "view_id": "soilmoisture/sm_250m_20230608_usa",
            "launchdate": "2023-06-08",
            "max": 23.6,
            "min": 22.5,
            "std": 0.34,
            "median": 23.1,
            "average": 23.20,
            "variance": 0.12,
        },
        {
            "id": 9,
            "view_id": "soilmoisture/sm_250m_20230609_usa",
            "launchdate": "2023-06-09",
            "max": 23.8,
            "min": 22.7,
            "std": 0.35,
            "median": 23.3,
            "average": 23.40,
            "variance": 0.13,
        },
        {
            "id": 10,
            "view_id": "soilmoisture/sm_250m_20230610_usa",
            "launchdate": "2023-06-10",
            "max": 23.7,
            "min": 22.6,
            "std": 0.32,
            "median": 23.2,
            "average": 23.30,
            "variance": 0.11,
        },
        {
            "id": 11,
            "view_id": "soilmoisture/sm_250m_20230611_usa",
            "launchdate": "2023-06-11",
            "max": 23.2,
            "min": 22.1,
            "std": 0.29,
            "median": 22.7,
            "average": 22.80,
            "variance": 0.09,
        },
    ]
};


const defaultData = soilMoistureDataset.result;
// const defaultData = [
//   {
//     id: 1,
//     task: "Develop feature A",
//     status: "In Progress",
//     features: "User authentication",
//     description: "Implement JWT authentication for users",
//     launchdate: "2025-04-15",
//     owner: "John Doe",
//     launchname: "Spring Release",
//   },
//   {
//     id: 2,
//     task: "Bug Fix #234",
//     status: "Completed",
//     features: "UI Improvements",
//     description: "Fix the alignment issue on the dashboard",
//     launchdate: "2025-03-28",
//     owner: "Jane Smith",
//     launchname: "March Patch",
//   },
//   {
//     id: 3,
//     task: "Optimize Database Queries",
//     status: "Pending",
//     features: "Performance",
//     description: "Improve SQL queries for faster response time",
//     launchdate: "2025-05-10",
//     owner: "Alice Johnson",
//     launchname: "Performance Update",
//   },
//   {
//     id: 4,
//     task: "Add Dark Mode",
//     status: "In Progress",
//     features: "User Experience",
//     description: "Implement dark mode toggle for better usability",
//     launchdate: "2025-04-20",
//     owner: "Bob Williams",
//     launchname: "UI Update",
//   },
// ];

const defaultColumns = [
  { accessorKey: "launchname", header: "Launch name", cell: EditableCell },
  { accessorKey: "launchdate", header: "Launch date", cell: DateCell },
  { accessorKey: "owner", header: "Owner", cell: EditableCell },
  { accessorKey: "task", header: "Task", cell: EditableCell },
  { accessorKey: "status", header: "Status", cell: SelectCell, options: ["Active", "Inactive", "Pending"] },
  { accessorKey: "features", header: "Features", cell: EditableCell },
  { accessorKey: "description", header: "Description", cell: EditableCell },
];


export default function Spreadsheet() {
  
  const [tables, setTables] = useState([
  {
    id: 1,
    name: "Tableau 1",
    columns: defaultColumns,
    data: defaultData.map((row, i) => ({ ...row, id: i + 1 })),
  },
]);

const [activeTableId, setActiveTableId] = useState(1);
const [isCreating, setIsCreating] = useState(false);
const [newTableName, setNewTableName] = useState("");


// const createNewTable = () => {
//   const newId = tables.length + 1;
//   const newTable = {
//     id: newId,
//     name: `Table ${newId}`,
//     columns: [],
//     data: [],
//   };
//   setTables([...tables, newTable]);
//   setActiveTableId(newId);
// };

  // Affiche le champ de saisie pour nommer la nouvelle table
  const startCreatingTable = () => {
    setNewTableName("");
    setIsCreating(true);
  };

  // Valide et crée la table
  const confirmCreateTable = () => {
    if (newTableName.trim() === "") {
      alert("Veuillez saisir un nom pour la table");
      return;
    }
    const newId = tables.length + 1;
    const newTable = {
      id: newId,
      name: newTableName,
      columns: [],
      data: [],
    };
    setTables([...tables, newTable]);
    setActiveTableId(newId);
    setIsCreating(false);
  };

  // Annule la création (cache le champ)
  const cancelCreateTable = () => {
    setIsCreating(false);
  };
const deleteTable = (id) => {
  const updated = tables.filter(t => t.id !== id);
  setTables(updated);
  if (activeTableId === id && updated.length > 0) {
    setActiveTableId(updated[0].id);
  }
};

const setTableData = (id, updater) => {
  setTables(prevTables =>
    prevTables.map(t =>
      t.id === id
        ? {
            ...t,
            data: typeof updater === "function" ? updater(t.data) : [...updater],
          }
        : t
    )
  );
};

const setTableColumns = (id, newCols) => {
  setTables(prevTables =>
    prevTables.map(t =>
      t.id === id
        ? { ...t, columns: [...newCols] } // ✅ assure un nouveau tableau
        : t
    )
  );
};

const activeTable = tables.find(t => t.id === activeTableId);

  

return(
  <>
    <Header />
    <div className="flex min-h-screen">
      {/* Menu à gauche */}
      <div className="w-64 bg-gray-100 p-4 border-r border-gray-300">
        <h2 className="text-lg font-semibold mb-4">Tables</h2>
        <ul className="space-y-2">
          {tables.map((table) => (
            <li key={table.id} className="flex items-center justify-between">
              <button
                onClick={() => setActiveTableId(table.id)}
                className={`flex-1 text-left px-3 py-2 rounded ${table.id === activeTableId ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}
              >
                {table.name}
              </button>
              <button
                onClick={() => deleteTable(table.id)}
                className="text-red-500 ml-2 hover:text-red-700"
                title="Supprimer"
              >
                ✕
              </button>
            </li>
          ))}
          <li>
            {!isCreating ? (
                <button
                  onClick={startCreatingTable}
                  className="w-full px-3 py-2 mt-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  New Table
                </button>
              ) : (
                <div className="mt-2">
                  <input
                    type="text"
                    value={newTableName}
                    onChange={(e) => setNewTableName(e.target.value)}
                    placeholder="Nom de la table"
                    className="border px-2 py-1 rounded w-full"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={confirmCreateTable}
                      className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={cancelCreateTable}
                      className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
          </li>
        </ul>
      </div>

      {/* Tableau actif */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">{activeTable?.name}</h1>
        {activeTable && (
          <EditableTable
            data={activeTable.data}
            setData={(newData) => setTableData(activeTable.id, newData)}
            columns={activeTable.columns}
            setColumns={(newCols) => setTableColumns(activeTable.id, newCols)}
          />
        )}
      </div>
	    <SensorOscillatorPlot sensorData={defaultData} />
    </div>
  </>
)};