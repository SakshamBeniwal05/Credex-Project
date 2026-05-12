import { create } from 'zustand'
import type { Model, AuditResponse, AuditFormData, SelectedPlan } from '../types'

interface ModelStore {
    models: Model[] | null;
    result: AuditResponse | null;
    checkmodels: () => Promise<void>;
    auditor: (data: AuditFormData) => Promise<string | undefined>;
    fetcher: (slug: string) => Promise<void>;
}

const api = "https://credex-project-on3v.onrender.com"

export const api_data_store = create<ModelStore>((set) => ({
    models: null,
    result: null,

    checkmodels: async () => {
        try {
            const res = await fetch(`${api}/models`);
            const data: Model[] = await res.json();
            set({ models: data });
        } catch (error) {
            console.error("Error fetching models:", error);
        }
    },

    auditor: async (data: AuditFormData): Promise<string | undefined> => {
        try {
            const selected_plans: SelectedPlan[] = (data.selected_plans || []).map((item: string) => JSON.parse(item));
            const { primary_use, team_size } = data;
            
            const res = await fetch(`${api}/audit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ selected_plans, primary_use, team_size })
            });
            
            const result: AuditResponse = await res.json();
            set({ result });
            return result.auditId;
        } catch (error) {
            console.error("Error running audit:", error);
            return undefined;
        }
    },

    fetcher: async (slug: string): Promise<void> => {
        try {
            const res = await fetch(`${api}/audit/${slug}`);
            const result: AuditResponse = await res.json();
            set({ result });
        } catch (error) {
            console.error("Error fetching audit result:", error);
        }
    }
}))