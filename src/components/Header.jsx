import useAuthStore from "../store/auth";

function Header() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  return (
    <div className="text-black flex justify-between items-center">
      <span className="font-bold text-2xl ">Not defterim</span>
      <div className="flex items-center gap-4">
        <p>
          {user.name} {user.surname}
        </p>
        <button
          onClick={logout}
          className="bg-red-500 text-white rounded px-4 py-2 text-sm"
        >
          Çıkış yap
        </button>
      </div>
    </div>
  );
}

export default Header;
