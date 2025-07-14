'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/services/store';
import Header from '@/components/header/header';
import Sidebar from '@/components/sidebar/sidebar';
import { getDatabase, getTables, createTable, getTable } from '@/services/anmaClient';
import type { TableEntity, DatabaseEntity } from '@/services/anmaClient';
import PopupForm from '@/components/PopupForm';
import { useRouter } from 'next/navigation';


export default function DatabasePage() {
  const dbSlug = (useParams()).id + "";
  console.log(dbSlug)
  const token = useAppStore(state => state.token);
  const currentWorkspace = useAppStore(state => state.currentWorkspace);
  console.log(currentWorkspace)
  const [selectedTable, setSelectedTable] = useState<TableEntity | null>(null);

  const [database, setDatabase] = useState<DatabaseEntity | null>(null);
  const [tables, setTables] = useState<TableEntity[]>([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  useEffect(() => {
    if (!token || !currentWorkspace || typeof dbSlug !== 'string') {
      console.warn('⛔ Token, workspace ou dbSlug manquant');
      return;
    }

    console.log('📥 Chargement de la base de données avec slug :', dbSlug);

    getDatabase(currentWorkspace.id, dbSlug, token)
      .then(db => {
        console.log('✅ Base de données récupérée :', db);
        setDatabase(db);
      })
      .catch(err => console.error('❌ Erreur lors de la récupération de la base :', err));

    getTables(currentWorkspace.id, dbSlug, token)
      .then(tables => {
        console.log(`✅ ${tables.length} tables récupérées :`, tables);
        setTables(tables);
      })
      .catch(err => console.error('❌ Erreur lors de la récupération des tables :', err));
  }, [token, currentWorkspace, dbSlug]);

  const sidebarContent = {
    createSections: [
      {
        label: 'New Table',
        bgColor: '#3B82F6',
        onClick: () => {
          console.log('🖱️ Bouton "New Table" cliqué');
          setShowCreatePopup(true);
        },
      }
    ],
    otherSections: [
      {
        section_title: 'Tables',
        section_content: tables.map(table => ({
          label: table.name || 'Untitled',
          onClick: async () => {
            console.log(`📋 Table cliquée : ${table.slug}`);
            try {
              if (!token || !currentWorkspace || !table.slug) {console.log("Donnée manquante"); return};
              const fullTable = await getTable(currentWorkspace.id, dbSlug, table.slug, token);
              console.log('✅ Table chargée :', fullTable);
              setSelectedTable(fullTable);
            } catch (err) {
              console.error('❌ Erreur lors du chargement de la table :', err);
            }
          }
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
          <p className="text-gray-600">Slug: {dbSlug}</p>
          <p className="text-gray-600">Tables: {tables.length}</p>
        </main>
      </div>

      <PopupForm
        visible={showCreatePopup}
        title="Create Table"
        onCancel={() => {
          console.log('❌ Création annulée');
          setShowCreatePopup(false);
        }}
        onSubmit={async (data) => {
          console.log('📤 Tentative de création de table avec data :', data);

          try {
            if (!token || !currentWorkspace || typeof dbSlug !== 'string') {
              console.warn('⛔ Impossible de créer la table : informations manquantes');
              return;
            }

            const newTable = await createTable(currentWorkspace.id, dbSlug, {
              name: data.name,
            }, token);

            console.log('✅ Table créée avec succès :', newTable);
            setTables(prev => [...prev, newTable]);
          } catch (err) {
            console.error('❌ Erreur lors de la création de la table :', err);
          } finally {
            setShowCreatePopup(false);
          }
        }}
        fields={[
          { label: 'Name', name: 'name', type: 'text' },
        ]}
      />
    </div>
  );
}

