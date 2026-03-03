import { create } from "zustand";

export const useSearchQuery = create((set) => ({
    initialSearchQuery: "",
    searchQuery: "",

    getSearchQuery: (srch) => {
        set({initialSearchQuery: "", searchQuery: srch})
    }
}))