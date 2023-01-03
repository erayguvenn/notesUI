import Header from "./components/Header";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import useAuthStore from "./store/auth";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import OnlyGuestRoute from "./components/OnlyGuestRoute";
import HomePage from "./pages/Home";
import { GetUser } from "./services/user";

function App() {
  const authStore = useAuthStore();

  useEffect(() => {
    async function getInıtialAuth() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          authStore.setLoggedIn(false);
          return;
        }

        const user = await GetUser(token);
        authStore.setUser(user);
        authStore.setLoggedIn(true);
        authStore.setToken(token);
      } catch (err) {
        console.error(err);
      }
    }

    getInıtialAuth();
  }, []);
  return (
    <div className="bg-slate-100 font-inter">
      <div className="w-full max-w-3xl mx-auto py-4 min-h-screen flex">
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <OnlyGuestRoute>
                  <LoginPage />
                </OnlyGuestRoute>
              }
            />
            <Route
              path="/register"
              element={
                <OnlyGuestRoute>
                  <RegisterPage />
                </OnlyGuestRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
