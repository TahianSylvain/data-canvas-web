import { create } from 'zustand';
import { WorkspaceEntity } from '@/services/anmaClient';

interface AppState {
  token: string | null;
  setToken: (t: string | null) => void;

  currentWorkspace: WorkspaceEntity | null;
  setCurrentWorkspace: (ws: WorkspaceEntity | null) => void;

  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  token: null,
  setToken: (t) => set({ token: t }),

  currentWorkspace: null,
  setCurrentWorkspace: (ws) => set({ currentWorkspace: ws }),

  reset: () => set({ token: null, currentWorkspace: null }),
}));

