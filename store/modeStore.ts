import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Mode = 'hotel' | 'wedding';

interface ModeState {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
}

export const useModeStore = create<ModeState>()(
  persist(
    (set) => ({
      mode: 'hotel',
      setMode: (mode) => set({ mode }),
      toggleMode: () => set((state) => ({ mode: state.mode === 'hotel' ? 'wedding' : 'hotel' })),
    }),
    {
      name: 'vishram-sthal-mode',
    }
  )
);
