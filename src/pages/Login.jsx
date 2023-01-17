import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { Login } from "../services/auth";
import { GetUser } from "../services/user";
import useAuthStore from "../store/auth";

function LoginPage() {
  const authStore = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Form submit edildiğinde login servisini çağırıyoruz.
  // Eğer login başarılı olursa kullanıcıyı anasayfaya yönlendiriyoruz.
  // Eğer login başarısız olursa hata mesajını konsola yazdırıyoruz.
  async function onSubmit(e) {
    e.preventDefault();

    // Login işlemi sırasında kullanıcıya bir loading mesajı gösteriyoruz.
    // Login işlemi başarılı olursa kullanıcıya bir success mesajı gösteriyoruz.
    // Login işlemi başarısız olursa kullanıcıya bir error mesajı gösteriyoruz.
    toast.promise(
      new Promise(async (res, rej) => {
        try {
          const response = await Login(email, password);
          const user = await GetUser(response.token);

          authStore.setLoggedIn(true);
          authStore.setToken(response.token);
          authStore.setUser(user);
          localStorage.setItem("token", response.token);

          navigate("/");
          res();
        } catch (err) {
          rej(err.message);
        }
      }),
      {
        loading: "Giriş yapılıyor...",
        success: "Başarıyla giriş yaptın",
        error: (e) => "Giriş yaparken bir hata oluştu. " + e,
      }
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center text-black">
      <div className="shadow-md p-8 w-full max-w-sm bg-white rounded">
        <p className="text-center text-2xl">Giriş yap</p>

        <form className="mt-12 space-y-4" onSubmit={onSubmit}>
          <div className="flex flex-col space-y-1">
            <label>Eposta</label>
            <input
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="border-2 p-1"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label>Şifre</label>
            <input
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              type="password"
              required
              min={8}
              max={64}
              className="border-2 p-1"
            />
          </div>

          <div className="flex justify-center">
            <button className="bg-black text-white w-full p-3 text-sm hover:bg-black/75 transition active:scale-90">
              Giriş yap
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center">
          Henüz bir hesabın yok mu?
          <NavLink to="/register" className="text-black font-bold px-1">
            Kayıt ol!
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
