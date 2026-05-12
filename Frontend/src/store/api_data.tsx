import { create } from 'zustand'

interface ModelStore {
    models: any;
    result: any;                          // ← store result here
    checkmodels: () => Promise<void>;
    auditor: (data: any) => Promise<void>;
    fetcher: (slug: string) => Promise<void>;
}

const api = "http://localhost:3000"

export const api_data_store = create<ModelStore>((set) => ({
    models: null,
    result: null,

    checkmodels: async () => {
        try {
            const res = await fetch(`${api}/models`);
            const data = await res.json();
            set({ models: data });
        } catch (error) {
            console.error(error);
        }
    },

    auditor: async (data: any) => {
        const selected_plans = (data.selected_plans || []).map((item: string) => JSON.parse(item));
        const { primary_use, team_size } = data;
        try {
            const res = await fetch(`${api}/audit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ selected_plans, primary_use, team_size })
            });
            const result = await res.json();
            set({ result });
            return result.auditId; // ← return id
        } catch (error) {
            console.error(error);
        }
    },

    fetcher: async (slug: string) => {
        try {
            const res = await fetch(`${api}/audit/${slug}`);  // ← correct endpoint with id
            const result = await res.json();
            set({ result });
        } catch (error) {
            console.error(error);
        }
    }
}))