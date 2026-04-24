import { create } from "zustand"; 
import { register, login, logout, getMe } from "../api/auth.api";

const getErrorMessage = (error, fallback) => error?.response?.data?.message || fallback;

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,
  error: null,

  registerUser: async (userDetails) => {
    set({ isLoading: true, error: null });

    try {
      const data = await register(userDetails);
      set({ user: data.user, isAuthenticated: true, isLoading: false, error: null });
      return data;
    } catch (error) {
      set({ isLoading: false, error: getErrorMessage(error, "Registration failed") });
      throw error;
    }
  },

  loginUser: async (credentials) => {
    set({ isLoading: true, error: null });

    try {
      const data = await login(credentials);
      set({ user: data.user, isAuthenticated: true, isLoading: false, error: null });
      return data;
    } catch (error) {
      set({ isLoading: false, error: getErrorMessage(error, "Login failed") });
      throw error;
    }
  },

  logoutUser: async () => {
    set({ isLoading: true, error: null });

    try {
      await logout();
      set({ user: null, isAuthenticated: false, isLoading: false, error: null });
    } catch (error) {
      set({ error: getErrorMessage(error, "Logout failed") });
      throw error;
    } finally {
      set({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });

    try {
      const data = await getMe();
      set({ user: data.user, isAuthenticated: true, isCheckingAuth: false, error: null });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isCheckingAuth: false, error: null });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
