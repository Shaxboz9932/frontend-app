import { create } from "zustand";

const getInitialAccessToken = () => localStorage.getItem("accessToken")
const getInitialRefreshToken = () => localStorage.getItem("refreshToken")

export const useUserStore = create((set) => ({
    accessToken: getInitialAccessToken(),
    refreshToken: getInitialRefreshToken(),
    user: null, 
    email: null,
    isAuthenticated: !!getInitialAccessToken(),

    login: (newToken, refresh, userData) => {
        localStorage.setItem('accessToken', newToken)
        localStorage.setItem('refreshToken', refresh)
        set({accessToken: newToken, refreshToken: refresh, user: userData, isAuthenticated: true})
    },

    logout: () => {
        localStorage.clear()
        set({accessToken: null, refreshToken: null, userData: null, isAuthenticated: false})
    },

    register: (email) => {
        set({email: email})
    },
}))