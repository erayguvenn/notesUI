import { Navigate } from "react-router-dom";
import useAuthStore from "../store/auth";

// Bu component, çocuk componentlerini sadece giriş yapmış kullanıcılar için gösterir.
// Eğer kullanıcı giriş yapmamışsa, çocuk componentler yerine "/login" path'ine yönlendirir.
function ProtectedRoute({ children }) {
  const loggedIn = useAuthStore((state) => state.loggedIn);

  if (loggedIn == null) {
    return <div>...</div>;
  }

  if (loggedIn == false) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
