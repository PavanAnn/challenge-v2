import { create } from 'zustand';
import { Assets } from '../features/assets/Types';

type SelectedComponentStore = {
    selectedComponent: Assets | null;
    setSelectedComponent: (component: Assets) => void;
    clearSelectedComponent: () => void;
};

export const useSelectedComponent = create<SelectedComponentStore>((set) => ({
    selectedComponent: null,
    setSelectedComponent: (component) => set({ selectedComponent: component }),
    clearSelectedComponent: () => set({ selectedComponent: null }),
}));