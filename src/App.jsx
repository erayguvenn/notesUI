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

import bgImage from "./assets/bg.jpg";

function App() {
  const authStore = useAuthStore();

  // Sayfa ilk yüklendiğinde eğer daha önce kaydedilmiş bir token varsa
  // bu token'i kontrol edip eğer geçerliyse kullanıcıyı giriş yapmış varsayıyoruz.
  useEffect(() => {
    async function getInitialAuth() {
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
        authStore.setLoggedIn(false);
        console.error(err);
      }
    }

    getInitialAuth();
  }, []);

  // Rotaları burada tanımlıyoruz.
  // Rotaları sadece giriş yapmış kullanıcıların görebileceği ya da
  // sadece giriş yapmamış kullanıcıların görebileceği şekilde ayarlıyoruz.
  return (
    <div className="font-inter h-screen relative overflow-hidden text-white flex">
      <img
        src={bgImage}
        className="absolute top-0 left-0 w-full h-full blur-sm object-cover object-center scale-105"
      />
      <div className="w-full mx-auto flex-1 flex relative">
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
