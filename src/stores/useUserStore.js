import create from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(persist((set) => ({
  user: null,
  token: null,
  setUser: ({ token, ...user }) => {
    set({ user, token });
    localStorage.setItem('token', token);
  },
  clearUser: () => {
    set({ user: null, token: null });
    localStorage.removeItem('token');
  },
}), {
  name: 'user-store',
  getStorage: () => localStorage
}));

export default useUserStore;
