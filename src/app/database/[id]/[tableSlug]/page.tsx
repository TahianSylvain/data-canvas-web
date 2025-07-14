'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/services/store';
import Header from '@/components/header/header';
import Sidebar from '@/components/sidebar/sidebar';
import { getTable } from '@/services/anmaClient';
import type { TableEntity } from '@/services/anmaClient';

export default function TablePage() {
  const params = useParams();
  const dbSlug = params?.dbSlug as string;
  const tableSlug = params?.tableSlug as string;

  const token = useAppStore(state => state.token);
  const currentWorkspace = useAppStore(state => state.currentWorkspace);

  const [table, setTable] = useState<TableEntity | null>(null);

  useEffect(() => {
    if (!token || !currentWorkspace || !dbSlug || !tableSlug) return;

    console.log("🔍 Chargement de la table :", tableSlug);

    getTable(currentWorkspace.id, dbSlug, tableSlug, token)
      .then((t) => {
        console.log("✅ Table récupérée :", t);
        setTable(t);
      })
      .catch((err) => {
        console.error("❌ Erreur getTable:", err);
      });
  }, [token, currentWorkspace, dbSlug, tableSlug]);

  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <Header />
      <div className="flex flex-grow">
        <Sidebar createSections={[]} otherSections={[]} />
        <main className="p-6 w-full">
          <h1 className="text-2xl font-bold mb-4">{table?.name || 'Loading...'}</h1>
          <p className="text-gray-600">Slug: {tableSlug}</p>
          <pre className="bg-gray-100 p-4 mt-4 rounded text-sm">
            {table?.columnsJson ? JSON.stringify(JSON.parse(table.columnsJson), null, 2) : 'Aucune colonne définie'}
          </pre>
        </main>
      </div>
    </div>
  );
}

