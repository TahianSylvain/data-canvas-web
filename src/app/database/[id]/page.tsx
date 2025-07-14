'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/services/store';
import Header from '@/components/header/header';
import Sidebar from '@/components/sidebar/sidebar';
import { getDatabase, getTables, createTable, getTable, updateTable } from '@/services/anmaClient';
import type { TableEntity, DatabaseEntity } from '@/services/anmaClient';
import PopupForm from '@/components/PopupForm';
import EditableTable from '@/components/EditableTable';

export default function DatabasePage() {
  const dbSlug = (useParams()).id + "";
  const token = useAppStore(state => state.token);
  const currentWorkspace = useAppStore(state => state.currentWorkspace);

  const [selectedTable, setSelectedTable] = useState<TableEntity | null>(null);
  const [tableRows, setTableRows] = useState<any[]>([]);
  const [database, setDatabase] = useState<DatabaseEntity | null>(null);
  const [tables, setTables] = useState<TableEntity[]>([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  useEffect(() => {
    if (!token || !currentWorkspace || typeof dbSlug !== 'string') {
      console.warn('⛔ Token, workspace ou dbSlug manquant');
      return;
    }

    getDatabase(currentWorkspace.id, dbSlug, token)
      .then(db => setDatabase(db))
      .catch(err => console.error('❌ Erreur lors de la récupération de la base :', err));

    getTables(currentWorkspace.id, dbSlug, token)
      .then(tables => setTables(tables))
      .catch(err => console.error('❌ Erreur lors de la récupération des tables :', err));
  }, [token, currentWorkspace, dbSlug]);

  const handleTableClick = async (table: TableEntity) => {
    try {
      if (!token || !currentWorkspace || !table.slug) return;
      const fullTable = await getTable(currentWorkspace.id, dbSlug, table.slug, token);
      const parsed = JSON.parse(fullTable.columnsJson || '{}');

      // Correction : rows = parsed.__rows ou bien construire à partir des colonnes
      let rows: any[] = [];
      if (Array.isArray(parsed.__rows)) {
        rows = parsed.__rows;
      } else {
        const colKeys = Object.keys(parsed);
        const rowCount = colKeys.length ? (parsed[colKeys[0]].value?.length || 0) : 0;
        rows = Array.from({ length: rowCount }, (_, i) => {
          const row: any = {};
          for (const key of colKeys) {
            row[key] = parsed[key].value?.[i] ?? '';
          }
          return row;
        });
      }

      setSelectedTable({ ...fullTable });
      setTableRows(rows);
    } catch (err) {
      console.error('❌ Erreur lors du chargement de la table :', err);
    }
  };

  const handleSaveTable = async (columnsJson: string, rows: any[]) => {
    if (!token || !currentWorkspace || !selectedTable?.slug) return;
    try {
      const parsed = JSON.parse(columnsJson);
      parsed.__rows = rows;
      const updated = await updateTable(currentWorkspace.id, dbSlug, selectedTable.slug, {
        columnsJson: JSON.stringify(parsed),
      }, token);
      setSelectedTable({ ...updated });
    } catch (err) {
      console.error('❌ Erreur lors de la sauvegarde de la table :', err);
    }
  };

  const sidebarContent = {
    createSections: [
      {
        label: 'New Table',
        bgColor: '#3B82F6',
        onClick: () => setShowCreatePopup(true),
      }
    ],
    otherSections: [
      {
        section_title: 'Tables',
        section_content: tables.map(table => ({
          label: table.name || 'Untitled',
          onClick: () => handleTableClick(table),
        })),
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <Header />
      <div className="flex flex-grow">
        <Sidebar {...sidebarContent} />
        <main className="p-6 w-full">
          <h1 className="text-2xl font-bold mb-4">{database?.name || 'Loading...'}</h1>
          {selectedTable && (
            <div className="mt-6">
              <EditableTable
                key={selectedTable.id + '-' + (selectedTable.updatedAt ?? '')}
                table={selectedTable}
                dbSlug={dbSlug}
                rows={tableRows}
                onRowsChange={setTableRows}
                onSave={handleSaveTable}
              />
            </div>
          )}
        </main>
      </div>

      <PopupForm
        visible={showCreatePopup}
        title="Create Table"
        onCancel={() => setShowCreatePopup(false)}
        onSubmit={async (data) => {
          try {
            if (!token || !currentWorkspace || typeof dbSlug !== 'string') return;

            const newTable = await createTable(currentWorkspace.id, dbSlug, {
              name: data.name,
            }, token);

            setTables(prev => [...prev, newTable]);
          } catch (err) {
            console.error('❌ Erreur lors de la création de la table :', err);
          } finally {
            setShowCreatePopup(false);
          }
        }}
        fields={[{ label: 'Name', name: 'name', type: 'text' }]}
      />
    </div>
  );
}

