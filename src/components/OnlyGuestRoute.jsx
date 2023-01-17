import { Navigate } from "react-router-dom";
import useAuthStore from "../store/auth";

// Bu component, çocuk componentlerini sadece giriş yapmamış kullanıcılar için gösterir.
// Eğer kullanıcı giriş yapmışsa, çocuk componentler yerine "/" path'ine yönlendirir.
function OnlyGuestRoute({ children }) {
  const loggedIn = useAuthStore((state) => state.loggedIn);

  if (loggedIn == null) {
    return <div>...</div>;
  }

  if (loggedIn == true) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default OnlyGuestRoute;
