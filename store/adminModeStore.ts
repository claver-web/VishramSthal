import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AdminMode = 'hotel' | 'wedding';

interface AdminModeState {
  adminMode: AdminMode;
  setAdminMode: (mode: AdminMode) => void;
  toggleAdminMode: () => void;
}

export const useAdminModeStore = create<AdminModeState>()(
  persist(
    (set) => ({
      adminMode: 'hotel',
      setAdminMode: (adminMode) => set({ adminMode }),
      toggleAdminMode: () => set((state) => ({ adminMode: state.adminMode === 'hotel' ? 'wedding' : 'hotel' })),
    }),
    {
      name: 'vishram-sthal-admin-mode',
    }
  )
);
