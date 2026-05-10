import { create } from 'zustand'
interface ModelStore {
    models: any;
    checkmodels: () => Promise<void>;
}
export const api_data_store = create<ModelStore>((set, get) => ({

    models: null,
    checkmodels: async () => {
        try {
            const res = await fetch("http://localhost:3000/models")
            const data = await res.json();
            set({ models: data });
        } catch (error) {
            console.error(error);
        }
    },
    auditor: async (data: any) => {
        const selected_plans = (data.selected_plans || []).map((item: string) => JSON.parse(item));
        console.log(selected_plans);
    }
}))