'use client';

import React, { useEffect, useState } from 'react';
import { python } from '@codemirror/lang-python';
import { v4 as uuidv4 } from 'uuid';
import CodeMirror from '@uiw/react-codemirror';
import {
  executeCell,
  executeNotebook,
  updateNotebook,
  getNotebook,
} from '@/services/anmaClient';
import { useAppStore } from '@/services/store';
import Header from '@/components/header/header';
import { useParams } from 'next/navigation';
import AnsiToHtml from 'ansi-to-html';

const ansiConverter = new AnsiToHtml();

interface OutputItem {
  type: 'text' | 'image' | 'error';
  value: string;
}

interface Cell {
  input: string;
  outputs: OutputItem[];
}

export default function NotebookPage() {
  const token = useAppStore(state => state.token);
  const currentWorkspace = useAppStore(state => state.currentWorkspace);
  const params = useParams();
  const notebookSlug = params.slug;

  const [cells, setCells] = useState<Cell[]>([]);
  const [notebookName, setNotebookName] = useState('Untitled Notebook');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadNotebook() {
      if (!token || !currentWorkspace || !notebookSlug) {
        console.warn('🔴 Missing token, workspace or notebook slug');
        return;
      }
      setIsLoading(true);
      try {
        console.log('📡 Fetching notebook:', notebookSlug);
        const res = await getNotebook(currentWorkspace.id, notebookSlug, token);
        if (!res.ok) {
          const text = await res.text();
          console.error('❌ Failed to fetch notebook:', res.status, text);
          return;
        }
        const data = await res.json();
        console.log('📥 Notebook data received:', data);

        setNotebookName(data.name || 'Untitled Notebook');

        if (Array.isArray(data.content)) {
          setCells(data.content);
          console.log('✅ Notebook cells set:', data.content);
        } else {
          console.log('🟡 No valid content, initializing with one cell');
          setCells([{ input: '# Write your Python code here', outputs: [] }]);
        }
      } catch (e) {
        console.error('❌ Error loading notebook:', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadNotebook();
  }, [token, currentWorkspace, notebookSlug]);

  const handleCodeChange = (index: number, newCode: string) => {
    console.log(`✏️ Code changed in cell ${index}:`, newCode);
    const updated = [...cells];
    updated[index].input = newCode;
    setCells(updated);
  };

  const handleAddCell = () => {
    const newCell = { input: '', outputs: [] };
    console.log('➕ Adding new cell', newCell);
    setCells([...cells, newCell]);
  };

  const handleDeleteCell = (index: number) => {
    console.log('🗑️ Deleting cell with index:', index);
    const updated = [...cells];
    updated.splice(index, 1);
    setCells(updated);
  };

  const handleExecuteCell = async (index: number) => {
    if (!token || !currentWorkspace) return;
    const cell = cells[index];
    console.log(`🚀 Executing cell ${index} with code:\n`, cell.input);
    try {
      const res = await executeCell(
        currentWorkspace.id,
        { input: cell.input, outputs: [] },
        token
      );
      if (!res.ok) {
        const err = await res.text();
        console.error('❌ executeCell API error:', res.status, err);
        const updated = [...cells];
        updated[index].outputs = [{ type: 'error', value: err }];
        setCells(updated);
        return;
      }
      const data = await res.json();
      console.log(`📤 Output for cell ${index}:`, data.outputs);
      const updated = [...cells];
      updated[index].outputs = data.outputs || [];
      setCells(updated);
    } catch (e: any) {
      console.error('❌ Error executing cell:', e);
      const updated = [...cells];
      updated[index].outputs = [{ type: 'error', value: e.message || 'Unknown error' }];
      setCells(updated);
    }
  };

  const handleExecuteAll = async () => {
    if (!token || !currentWorkspace) return;
    console.log('🚀 Executing all cells');
    try {
      const payload = cells.map(c => ({ input: c.input, outputs: [] }));
      console.log('📦 Payload for executeNotebook:', payload);
      const res = await executeNotebook(currentWorkspace.id, payload, token);
      if (!res.ok) {
        const err = await res.text();
        console.error('❌ executeNotebook API error:', res.status, err);
        return;
      }
      const data = await res.json();
      console.log('📤 Output array from executeNotebook:', data);
      if (Array.isArray(data) && data.length === cells.length) {
        setCells(cells.map((c, idx) => ({ ...c, outputs: data[idx].outputs || [] })));
      } else {
        console.warn('⚠️ Unexpected response structure for executeNotebook');
      }
    } catch (e) {
      console.error('❌ Error executing notebook:', e);
    }
  };

  const handleSaveNotebook = async () => {
    if (!token || !currentWorkspace || !notebookSlug) return;
    setIsSaving(true);
    try {
      const dto = {
        name: notebookName,
        content: cells,
      };
      console.log('💾 Saving notebook with DTO:', dto);
      const res = await updateNotebook(currentWorkspace.id, notebookSlug, dto, token);
      if (!res.ok) {
        console.error('❌ updateNotebook API error:', res.status, await res.text());
        return;
      }
      const updated = await res.json();
      console.log('✅ Notebook saved:', updated);
      setNotebookName(updated.name || notebookName);
    } catch (e) {
      console.error('❌ Error saving notebook:', e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        <input
          className="border rounded px-3 py-2 mb-6 w-full text-lg font-semibold"
          value={notebookName}
          onChange={(e) => setNotebookName(e.target.value)}
          placeholder="Notebook name"
        />
        {isLoading ? (
          <p>Loading notebook...</p>
        ) : (
          cells.map((cell, idx) => (
            <div key={idx} className="mb-6 border rounded-md p-4 bg-white shadow-sm">
              <CodeMirror
                value={cell.input}
                height="auto"
                extensions={[python()]}
                onChange={(val) => handleCodeChange(idx, val)}
              />
              <div className="mt-2 bg-gray-50 p-3 rounded border min-h-[50px] max-h-96 overflow-auto">
                {cell.outputs.length === 0 ? <em>No output</em> : cell.outputs.map((out, i) => {
                  if (out.type === 'image') {
                    return <img key={i} src={`data:image/png;base64,${out.value}`} alt="Output" className="max-w-full" />;
                  }
                  const html = ansiConverter.toHtml(out.value);
                  return <pre key={i} className="whitespace-pre-wrap text-sm font-mono text-gray-800" dangerouslySetInnerHTML={{ __html: html }} />;
                })}
              </div>
              <div className="flex justify-end gap-3 mt-3">
                <button
                  onClick={() => handleExecuteCell(idx)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
                >
                  Run Cell
                </button>
                <button
                  onClick={() => handleDeleteCell(idx)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
                >
                  Delete Cell
                </button>
              </div>
            </div>
          ))
        )}

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleExecuteAll}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          >
            Run All
          </button>
          <button
            onClick={handleSaveNotebook}
            disabled={isSaving}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded disabled:opacity-50"
          >
            Save
          </button>
          <button
            onClick={handleAddCell}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded"
          >
            Add Cell
          </button>
        </div>
      </div>
    </>
  );
}

