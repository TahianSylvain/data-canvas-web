'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/services/store';
import Header from '@/components/header/header';
import Sidebar from '@/components/sidebar/sidebar';
import {
  getDatabase,
  getTables,
  createTable,
  getTable,
  updateTable,
} from '@/services/anmaClient';
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
  const [tablesMap, setTablesMap] = useState<Record<string, TableEntity>>({});

  useEffect(() => {
    if (!token || !currentWorkspace || typeof dbSlug !== 'string') return;

    getDatabase(currentWorkspace.id, dbSlug, token)
      .then(db => setDatabase(db))
      .catch(console.error);

    getTables(currentWorkspace.id, dbSlug, token)
      .then(tables => {
        setTables(tables);
        const map: Record<string, TableEntity> = {};
        tables.forEach(t => map[t.slug!] = t);
        setTablesMap(map);
      })
      .catch(console.error);
  }, [token, currentWorkspace, dbSlug]);

  const handleTableClick = async (table: TableEntity) => {
    try {
      if (!token || !currentWorkspace || !table.slug) return;
      const fullTable = await getTable(currentWorkspace.id, dbSlug, table.slug, token);
      const parsed = JSON.parse(fullTable.columnsJson || '{}');

      const rowCount = parsed.__rows?.length || 0;
      for (const key of Object.keys(parsed)) {
        if (key === '__rows') continue;
        if (!Array.isArray(parsed[key].value)) {
          parsed[key].value = Array.from({ length: rowCount }, () => parsed[key].value ?? '');
        }
      }

      setSelectedTable({ ...fullTable, columnsJson: JSON.stringify(parsed) });
      setTableRows(parsed.__rows || []);
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

      const updatedParsed = JSON.parse(updated.columnsJson || '{}');
      setSelectedTable({ ...updated, columnsJson: JSON.stringify(updatedParsed) });
      setTableRows(updatedParsed.__rows || []);
    } catch (err) {
      console.error('❌ Erreur lors de la sauvegarde de la table :', err);
    }
  };

  const sidebarContent = {
    createSections: [
      {
        id: 'new-table-btn',
        label: 'New Table',
        bgColor: '#3B82F6',
        onClick: () => setShowCreatePopup(true),
      },
    ],
    otherSections: [
      {
        id: 'tables-section',
        section_title: 'Tables',
        section_content: tables.map(table => ({
          id: `table-link-${table.slug}`,
          label: table.name || 'Untitled',
          onClick: () => handleTableClick(table),
        })),
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen min-w-screen" id="database-page-root">
      <Header />
      <div className="flex flex-grow">
        <Sidebar {...sidebarContent} />
        <main className="p-6 w-full">
          <h1 id="database-title" className="text-2xl font-bold mb-4">
            {database?.name || 'Loading...'}
          </h1>
          {selectedTable && (
            <div className="mt-6" id="table-editor">
              <EditableTable
                key={selectedTable.id + '-' + selectedTable.updatedAt}
                table={selectedTable}
                dbSlug={dbSlug}
                rows={tableRows}
                onRowsChange={setTableRows}
                onSave={handleSaveTable}
                tablesMap={tablesMap}
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

            const initialColumns = {
              id: {
                type: 'number',
                value: [],
                options: { autoIncrement: true }
              }
            };

            const newTable = await createTable(currentWorkspace.id, dbSlug, {
              name: data.name,
              columnsJson: JSON.stringify(initialColumns),
            }, token);

            setTables(prev => [...prev, newTable]);
          } catch (err) {
            console.error('❌ Erreur lors de la création de la table :', err);
          } finally {
            setShowCreatePopup(false);
          }
        }}
        fields={[{ id: 'table-name-input', label: 'Name', name: 'name', type: 'text' }]}
      />
    </div>
  );
}

