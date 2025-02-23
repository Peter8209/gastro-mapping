import create from "zustand";

export const useStore = create((set) => ({
  tableData: [],
  setTableData: (data) => set({ tableData: data }),
}));
