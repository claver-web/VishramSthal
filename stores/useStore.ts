import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  setMenuOpen: (isOpen: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      isMenuOpen: false,
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
      setMenuOpen: (isOpen: boolean) => set({ isMenuOpen: isOpen }),
    }),
    {
      name: 'vishram-sthal-theme',
      partialize: (state) => ({ isMenuOpen: state.isMenuOpen }),
    }
  )
);
