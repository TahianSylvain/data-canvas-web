import { create } from 'zustand';
import { WorkspaceEntity } from '@/services/anmaClient';

interface AppState {
  token: string | null;
  setToken: (t: string) => void;

  currentWorkspace: WorkspaceEntity | null;
  setCurrentWorkspace: (ws: WorkspaceEntity) => void;
}

export const useAppStore = create<AppState>((set) => ({
  token: null,
  setToken: (t) => set({ token: t }),

  currentWorkspace: null,
  setCurrentWorkspace: (ws) => set({ currentWorkspace: ws }),
}));
