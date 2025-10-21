import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'system';

interface UIState {
  theme: ThemeMode;
  search: string;
  setTheme: (theme: ThemeMode) => void;
  setSearch: (value: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'light',
  search: '',
  setTheme: (theme) => set({ theme }),
  setSearch: (search) => set({ search })
}));
