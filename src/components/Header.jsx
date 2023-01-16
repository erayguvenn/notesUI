import { useMemo } from "react";
import useAuthStore from "../store/auth";

function Header() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const welcomeMessage = useMemo(() => {
    const date = new Date();

    const strs = ["İyi geceler", "Günaydın", "İyi günler", "İyi akşamlar"];

    const hours = date.getHours();

    return strs[Math.floor(hours / 6)];
  }, []);
  return (
    <div className="flex justify-between items-center">
      <span className=" text-xl ">
        ✋ {welcomeMessage} {user.name}
      </span>
      <div className="flex items-center gap-4">
        <button
          onClick={logout}
          className="bg-transparent hover:bg-red-700/25 text-white rounded px-4 py-2 text-sm transition"
        >
          Çıkış yap
        </button>
      </div>
    </div>
  );
}

export default Header;
