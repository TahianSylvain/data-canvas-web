'use client';

import { useState, useEffect } from 'react';
import PopupForm from '@/components/PopupForm';
import { updateTable } from '@/services/anmaClient';
import { useAppStore } from '@/services/store';
import type { TableEntity } from '@/services/anmaClient';

type ColumnType = 'string' | 'number' | 'boolean';

interface EditableTableProps {
  table: TableEntity;
  dbSlug: string;
  onSave: (columnsJson: string) => void;
}

export default function EditableTable({ table, dbSlug, onSave }: EditableTableProps) {
  const token = useAppStore(state => state.token);
  const currentWorkspace = useAppStore(state => state.currentWorkspace);

  // Colonnes (type + options), sans valeurs
  const [columns, setColumns] = useState<{ [key: string]: { type: ColumnType; options: any } }>({});

  // Rows = tableau de données, chaque row est un objet { colName: value }
  const [rows, setRows] = useState<Array<{ [key: string]: any }>>([]);

  const [showAddColumnPopup, setShowAddColumnPopup] = useState(false);

  // Initialisation au montage ou quand table change
  useEffect(() => {
    if (!table.columnsJson) {
      setColumns({});
      setRows([]);
      return;
    }

    try {
      const parsed = JSON.parse(table.columnsJson);

      // Extraire colonnes sans les valeurs, ni __rows
      const cols: typeof columns = {};
      for (const key in parsed) {
        if (key === '__rows') continue;
        cols[key] = {
          type: parsed[key].type || 'string',
          options: parsed[key].options || {},
        };
      }
      setColumns(cols);

      // Extraire rows du __rows ou reconstruire à partir des valeurs (fallback)
      if (Array.isArray(parsed.__rows)) {
        setRows(parsed.__rows);
      } else {
        // Fallback : reconstruit rows à partir des valeurs dans columns (pas top mais sécurité)
        const firstColKey = Object.keys(parsed)[0];
        const len = firstColKey ? (parsed[firstColKey].value?.length || 0) : 0;
        const rebuiltRows: Array<{ [key: string]: any }> = [];
        for (let i = 0; i < len; i++) {
          const row: { [key: string]: any } = {};
          for (const colKey in parsed) {
            row[colKey] = parsed[colKey].value?.[i] ?? getDefaultValue(parsed[colKey].type);
          }
          rebuiltRows.push(row);
        }
        setRows(rebuiltRows);
      }
    } catch {
      setColumns({});
      setRows([]);
    }
  }, [table]);

  const columnKeys = Object.keys(columns);

  // Ajout d'une ligne vide
  const handleAddRow = () => {
    const newRow: { [key: string]: any } = {};
    columnKeys.forEach(col => {
      newRow[col] = getDefaultValue(columns[col].type);
    });
    setRows(prev => [...prev, newRow]);
  };

  // Ajout d'une colonne
  const handleAddColumn = (data: { name: string; type: ColumnType }) => {
    if (columns[data.name]) {
      alert('Column already exists');
      return;
    }

    setColumns(prev => ({
      ...prev,
      [data.name]: {
        type: data.type,
        options: {},
      },
    }));

    setRows(prevRows =>
      prevRows.map(row => ({
        ...row,
        [data.name]: getDefaultValue(data.type),
      }))
    );
  };

  // Modification d'une cellule dans rows uniquement
  const handleCellChange = (colName: string, rowIndex: number, value: any) => {
    setRows(prev => {
      const newRows = [...prev];
      newRows[rowIndex] = { ...newRows[rowIndex], [colName]: value };
      return newRows;
    });
  };

  // Sauvegarde
  const handleSave = async () => {
    if (!token || !currentWorkspace) {
      alert('Token or workspace missing');
      return;
    }

    // Reconstruire columnsJson avec valeurs
    const newColumns: { [key: string]: { type: ColumnType; value: any[]; options: any } } = {};
    columnKeys.forEach(col => {
      newColumns[col] = {
        type: columns[col].type,
        value: rows.map(row => row[col] ?? getDefaultValue(columns[col].type)),
        options: columns[col].options || {},
      };
    });

    const columnsJsonObj = {
      ...newColumns,
      __rows: rows,
    };

    try {
      const columnsJsonStr = JSON.stringify(columnsJsonObj);
      await updateTable(currentWorkspace.id, dbSlug, table.slug!, { columnsJson: columnsJsonStr }, token);
      onSave(columnsJsonStr);
    } catch (err) {
      console.error('❌ Erreur updateTable:', err);
      alert('Error saving table');
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">{table.name}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddColumnPopup(true)}
            className="bg-blue-500 text-white px-4 py-1 rounded"
            type="button"
          >
            + Column
          </button>
          <button
            onClick={handleAddRow}
            className="bg-green-500 text-white px-4 py-1 rounded"
            type="button"
          >
            + Row
          </button>
          <button
            onClick={handleSave}
            className="bg-purple-500 text-white px-4 py-1 rounded"
            type="button"
          >
            💾 Save
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              {columnKeys.map(col => (
                <th key={col} className="border px-4 py-2 bg-gray-100">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columnKeys.map(colName => (
                  <td key={colName} className="border px-4 py-2">
                    {renderInput(
                      columns[colName].type,
                      row[colName] ?? getDefaultValue(columns[colName].type),
                      val => handleCellChange(colName, rowIndex, val),
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PopupForm
        visible={showAddColumnPopup}
        title="Add Column"
        onCancel={() => setShowAddColumnPopup(false)}
        onSubmit={data => {
          handleAddColumn({ name: data.name, type: data.type as ColumnType });
          setShowAddColumnPopup(false);
        }}
        fields={[
          { label: 'Column Name', name: 'name', type: 'text' },
          {
            label: 'Type',
            name: 'type',
            type: 'select',
            options: ['string', 'number', 'boolean'],
          },
        ]}
      />
    </div>
  );
}

function getDefaultValue(type: ColumnType): any {
  switch (type) {
    case 'string':
      return '';
    case 'number':
      return 0;
    case 'boolean':
      return false;
  }
}

function renderInput(type: ColumnType, value: any, onChange: (v: any) => void) {
  if (value === undefined || value === null) {
    value = getDefaultValue(type);
  }

  if (type === 'boolean') {
    return (
      <select
        value={value ? 'true' : 'false'}
        onChange={e => onChange(e.target.value === 'true')}
        className="w-full px-2 py-1 border rounded"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    );
  }

  return (
    <input
      type={type === 'number' ? 'number' : 'text'}
      value={value}
      onChange={e => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
      className="w-full px-2 py-1 border rounded"
    />
  );
}

