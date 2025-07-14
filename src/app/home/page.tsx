'use client'

import { useState, useEffect } from "react";
import ButtonCreat from "../../components/btn_new/page";
import ModelData from "../../components/dataBaseModel/page";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";

import { listWorkspaces, getDatabases, getNotebooks, createWorkspace, getWorkspace, createNotebook, createDatabase } from "@/services/anmaClient"; // adapte ton import
import type { WorkspaceEntity, DatabaseEntity, NotebookEntity } from "@/services/anmaClient";

import PopupForm from '@/components/PopupForm';

import { useAppStore } from "@/services/store"; // ← zustand
import { FiBook, FiCode, FiDatabase, FiCpu, FiGrid } from "react-icons/fi";

const colorOptions = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA'];

import { useRouter } from 'next/navigation'; // ← en haut du fichier


const iconOptions = [
  { name: "book", icon: <FiBook size={20} /> },
  { name: "code", icon: <FiCode size={20} /> },
  { name: "database", icon: <FiDatabase size={20} /> },
  { name: "cpu", icon: <FiCpu size={20} /> },
  { name: "grid", icon: <FiGrid size={20} /> },
];

export default function Acceuil() {
  const token = useAppStore(state => state.token);
  const setCurrentWorkspace = useAppStore(state => state.setCurrentWorkspace);
  const currentWorkspace = useAppStore(state => state.currentWorkspace);

  const router = useRouter();

  const [workspaceList, setWorkspaceList] = useState<WorkspaceEntity[]>([]);
  const [databases, setDatabases] = useState<DatabaseEntity[]>([]);
  const [notebooks, setNotebooks] = useState<NotebookEntity[]>([]);

  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const [popupType, setPopupType] = useState<null | "Database" | "Notebook" | "Workspace">(null);

  const sidebarContent = {
    createSections: [{
      label: "New workspace",
      bgColor: "#5DAF79",
      onClick: () => setPopupType("Workspace"),
    }],
    otherSections: [
      {
        section_title: "Workspaces",
        section_content: workspaceList.map(ws => ({
          label: ws.name || "Untitled",
          onClick: () => handleWorkspaceSelect(ws.slug!),
        })),
      }
    ]
  };

  async function handleWorkspaceSelect(slug: string) {
    if (!token) return;

    try {
      console.log("📥 Chargement workspace :", slug);
      const workspace = await getWorkspace(slug, token);
      const databases = await getDatabases(workspace.id, token);
      const notebooks = await getNotebooks(workspace.id, token);

      setCurrentWorkspace(workspace);
      setDatabases(databases);
      setNotebooks(notebooks);

      console.log("✅ Workspace sélectionné :", workspace);
    } catch (err) {
      console.error("❌ Erreur lors du chargement :", err);
    }
  }

  // 1. Load token if needed (optional fallback)
  useEffect(() => {
    if (!token) {
      const t = localStorage.getItem("accessToken");
      if (t) {
        console.log("✅ Token loaded from localStorage:", t);
        useAppStore.getState().setToken(t);
      }
    }
  }, []);

  // 2. Charger les workspaces
  useEffect(() => {
    if (!token) return;

    console.log("⏳ Chargement des workspaces...");
    listWorkspaces(token)
      .then((ws) => {
        console.log("✅ Workspaces récupérés :", ws);
        setWorkspaceList(ws);

        // Ne pas forcer la sélection si vide
        if (ws.length > 0) {
          setCurrentWorkspace(ws[0]);
          console.log("✅ Premier workspace sélectionné :", ws[0]);
        } else {
          setCurrentWorkspace(null);
        }
      })
      .catch((err) => {
        console.error("❌ Erreur listWorkspaces:", err);
      });
  }, [token]);

  // 3. Charger databases et notebooks du workspace sélectionné
  useEffect(() => {
    if (!token || !currentWorkspace) return;

    console.log("⏳ Chargement contenu du workspace :", currentWorkspace);

    getDatabases(currentWorkspace.id, token)
      .then((dbs) => {
        console.log("✅ Bases de données :", dbs);
        setDatabases(dbs);
      })
      .catch((err) => console.error("❌ Erreur getDatabases:", err));

    getNotebooks(currentWorkspace.id, token)
      .then((nbs) => {
        console.log("✅ Notebooks :", nbs);
        setNotebooks(nbs);
      })
      .catch((err) => console.error("❌ Erreur getNotebooks:", err));
  }, [token, currentWorkspace]);

  const buttons = [
    { text: 'New Database', color: 'green' },
    { text: 'New Notebook', color: 'blue' }
  ];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const textContentList = (e.currentTarget.textContent || '').split(' ');
    const _name = textContentList[textContentList.length - 1] as "Database" | "Notebook" | "Workspace";

    if (_name === "Database" || _name === "Notebook" || _name === "Workspace") {
      setPopupType(_name);
    } else {
      setPopupType(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <Header />
      <div className="flex flex-grow">
        <Sidebar
          {...sidebarContent}
        />

        <section className="contain_menu_acceuil">
          <section className="contain_sous_menu_acceuil">
            <div className="container_1">
              <h4 className="sous_titre_1">{currentWorkspace?.name || "..."}</h4>
              <div>
                {buttons.map(({ text, color }, idx) => (
                  <ButtonCreat
                    key={idx}
                    handleClick={handleClick}
                    text_btn={text}
                    color={color}
                  />
                ))}
              </div>
            </div>

            <div className="container_2">
              <p className="sous_titre_2">Databases</p>
              <div className="sous_container_1">
                {databases.map(({ id, name, slug }) => (
                  <ModelData
                    key={id}
                    name={name || "Untitled"}
                    type="Database"
                    color="blue"
                    onClick={() => router.push(`/database/${slug}`)} // ← ici
                  />
                ))}
              </div>

              <p className="sous_titre_2">Notebooks</p>
              <div className="sous_container_1">
                {notebooks.map(({ id, name, slug }) => (
                  <ModelData
                    key={id}
                    name={name || "Untitled"}
                    type="Notebook"
                    color="beige"
                    onClick={() => router.push(`/notebook/${slug}`)}
                  />
                ))}
              </div>
            </div>
          </section>
        </section>
      </div>
      {popupType && (
        <PopupForm
          visible={true}
          title={`Create ${popupType}`}
          onCancel={() => setPopupType(null)}
          onSubmit={async (data) => {
            if (!token) return;

            try {
              if (popupType === "Workspace") {
                const res = await createWorkspace({
                  name: data.name,
                  color: data.color,
                  logo: data.icon,
                }, token);
                setWorkspaceList(prev => [...prev, res]);
                setCurrentWorkspace(res);  // on met à jour le workspace courant ici
              } else if (popupType === "Database" || popupType === "Notebook") {
                if (!currentWorkspace) {
                  console.warn("⛔ Pas de workspace sélectionné, impossible de créer", popupType);
                  return;
                }

                if (popupType === "Database") {
                  const res = await createDatabase(currentWorkspace.id, {
                    name: data.name,
                    description: data.description || '',
                  }, token);
                  setDatabases(prev => [...prev, res]);
                } else if (popupType === "Notebook") {
                  const res = await createNotebook(currentWorkspace.id, {
                    name: data.name,
                  }, token);
                  setNotebooks(prev => [...prev, res]);
                }
              }
              setPopupType(null);
            } catch (e) {
              console.error(`Error creating ${popupType}:`, e);
            }
          }}
          fields={[
            ...(popupType === "Workspace" ? [
              { label: "Name", name: "name", type: "text" },
              //{ label: "Color", name: "color", type: "select", options: colorOptions },
              //{ label: "Icon", name: "icon", type: "icon", options: iconOptions },
            ] : []),

            ...(popupType === "Database" ? [
              { label: "Name", name: "name", type: "text" },
            ] : []),

            ...(popupType === "Notebook" ? [
              { label: "Name", name: "name", type: "text" },
            ] : []),
          ]}
        />
      )}
    </div>
  );
}
