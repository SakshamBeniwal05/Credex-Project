import { create } from 'zustand'
interface ModelStore {
    models: any;
    checkmodels: () => Promise<void>;
    auditor: (data: any) => Promise<void>;
}
const api = "http://localhost:3000"
export const api_data_store = create<ModelStore>((set, get) => ({
    models: null,
    checkmodels: async () => {
        try {
            const res = await fetch(`${api}/models`)
            const data = await res.json();
            set({ models: data });
        } catch (error) {
            console.error(error);
        }
    },
    auditor: async (data: any) => {
        const selected_plans = (data.selected_plans || []).map((item: string) => JSON.parse(item));
        console.log(selected_plans);
        window.print();
    }
}))