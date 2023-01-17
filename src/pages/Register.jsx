import { useState } from "react";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { Register } from "../services/auth";

function RegisterPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Form submit edildiğinde kayıt servisini çağırıyoruz.
  // Eğer kayıt başarılı olursa kullanıcıyı login sayfasına yönlendiriyoruz.
  // Eğer kayıt başarısız olursa hata mesajını konsola yazdırıyoruz.
  async function onSubmit(e) {
    e.preventDefault();

    // Kayıt işlemi sırasında kullanıcıya bir loading mesajı gösteriyoruz.
    // Kayıt işlemi başarılı olursa kullanıcıya bir success mesajı gösteriyoruz.
    // Kayıt işlemi başarısız olursa kullanıcıya bir error mesajı gösteriyoruz.
    toast.promise(
      new Promise(async (res, rej) => {
        try {
          const response = await Register(name, surname, email, password);
          res(response);
          navigate("/login");
        } catch (err) {
          rej(err.message);
        }
      }),
      {
        loading: "Kayıt olunuyor...",
        success: "Kayıt başarılı!",
        error: (e) => "Kayıt başarısız, " + e,
      }
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center text-black">
      <div className="shadow-md p-8 w-full max-w-sm bg-white rounded">
        <p className="text-center text-2xl">Kayıt ol</p>

        <form className="mt-12 space-y-4" onSubmit={onSubmit}>
          <div className="flex flex-col space-y-1">
            <label>Ad</label>
            <input
              value={name}
              onInput={(e) => setName(e.target.value)}
              type="text"
              className="border-2 p-1"
              required
              max={64}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label>Soyad</label>
            <input
              value={surname}
              onInput={(e) => setSurname(e.target.value)}
              type="text"
              className="border-2 p-1"
              max={64}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label>Eposta</label>
            <input
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              type="email"
              className="border-2 p-1"
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label>Şifre</label>
            <input
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              type="password"
              className="border-2 p-1"
              required
              min={8}
              max={64}
            />
          </div>

          <div className="flex justify-center">
            <button className="bg-black text-white w-full p-3 mt-2 text-sm hover:bg-black/75 transition">
              Kayıt ol
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-center">
          Zaten hesabın mı var?
          <NavLink to="/login" className="text-black font-bold px-1">
            Giriş yap!
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
