import { create } from 'zustand'
import { BACKEND_URL } from './constants';

const useAuth = create((set) => ({
    user: null,
    isAuthenticated: null,
    loading: true,

    checkAuth: async () => {
        set({ loading: true });
        try {
            const res = await fetch(`${BACKEND_URL}/auth/me`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            });

            let response = await res.json();

            if (Boolean(response.authenticated)) {
                set({
                    isAuthenticated: true,
                    user: { name: "..." },
                    loading: false
                });
            } else {
                set({ isAuthenticated: false, user: null, loading: false });
            }
        } catch (error) {
            set({ isAuthenticated: false, user: null, loading: false });
        }
    },

    logout: () => set({ user: null, isAuthenticated: false })
}))

export default useAuth;
