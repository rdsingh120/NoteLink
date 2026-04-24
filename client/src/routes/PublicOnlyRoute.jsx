import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/auth.store";

const PublicOnlyRoute = () => {
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isCheckingAuth) return <div>Loading...</div>;
  if (isAuthenticated) return <Navigate to="/" />;
  return <Outlet />;
};
export default PublicOnlyRoute;
