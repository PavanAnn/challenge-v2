import { create } from 'zustand';

type Company = {
    id: string;
    name: string;
};

type SelectedCompanyStore = {
    selectedCompany: Company | null;
    setSelectedCompany: (company: Company) => void;
    clearSelectedCompany: () => void;
};

export const useSelectedCompanyStore = create<SelectedCompanyStore>((set) => ({
    selectedCompany: null,
    setSelectedCompany: (company) => set({ selectedCompany: company }),
    clearSelectedCompany: () => set({ selectedCompany: null }),
}));