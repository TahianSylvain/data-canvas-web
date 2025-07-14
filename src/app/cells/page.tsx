// pages/cells.tsx
'use client'
import { useState } from "react";
import dynamic from "next/dynamic";
import { python } from "@codemirror/lang-python";
import { Plus } from "lucide-react";
import Header from "@/components/header/header";
import { FiPlay } from "react-icons/fi";


const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), { ssr: false });

export default function Cells() {
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [cels, setCels] =  useState(
    [
        {
            "input": "string",
            "outputs": [
                {
                "type": "string",
                "value": "string"
                }
            ]
        },
    ]
);


//   const handleRun = async () => {
//     try {
//       const res = await fetch("/api/run", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ code }),
//       });

//       const data = await res.json();
//       setOutput(data.output || "Aucune sortie");
//     } catch (err) {
//       setOutput("Erreur d'exécution");
//     }
//   };
const MoreCels = () => {
  const newCell = {
    input: "",
    outputs: [
      {
        type: "string",
        value: "",
      },
    ],
  };

  setCels([...cels, newCell]);
};

console.log(cels.length)
  return (
    <>
        <Header />
    
        <div className="p-6 max-w-4xl mx-auto containBtnMoreCells">
            <button onClick={MoreCels} className="btnMoreCels">
                <Plus size={20} />
                more cells
            </button>
            <button className="btnMoreCels">
                <FiPlay size={20} />
                run all
            </button>

        </div>
        {cels.map((cel, index) => (
        <div key={index} className="p-6 max-w-4xl mx-auto space-y-4">
            <h1 className="text-2xl font-bold">Bloc Cellulaire - Éditeur Python</h1>
            <p className="text-xs text-gray-500">Cell : {index}</p>

            <div className="border rounded p-3 shadow bg-gray-100">
            <CodeMirror
                value={code}
                height="200px"
                extensions={[python()]}
                onChange={(value) => setCode(value)}
            />
            <button
                // onClick={handleRun}
                className=" mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 btnRun"
            >
                <FiPlay size={20} />
                Exécuter
            </button>
            </div>

            <div className="border rounded p-4 shadow bg-white">
            <h2 className="text-lg font-semibold">Résultat :</h2>
            <pre className="mt-2 whitespace-pre-wrap text-sm">{output}</pre>
            </div>

            {/* Facultatif : debug */}
        </div>
        ))}
    </>
  );
}
