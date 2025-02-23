import { create } from "zustand";

export const useStore = create((set) => ({
  tableData: [], // ✅ Úložisko pre Excel údaje
  setTableData: (data) => set({ tableData: data }), // ✅ Funkcia na aktualizáciu dát
}));

