import create from "zustand";

const useAuthStore = create((set) => ({
  loggedIn: null,
  token: null,
  user: null,
  setLoggedIn: (state) => set({ loggedIn: state }),
  setToken: (token) => set({ token: token }),
  setUser: (user) => set({ user: user }),
  logout: () =>
    set(() => {
      localStorage.removeItem("token");
      return { loggedIn: false, token: null, user: null };
    }),
}));

export default useAuthStore;
