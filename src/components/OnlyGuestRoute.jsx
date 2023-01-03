import { Navigate } from "react-router-dom";
import useAuthStore from "../store/auth";

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
