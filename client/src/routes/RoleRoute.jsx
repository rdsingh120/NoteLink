import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/auth.store";

const RoleRoute = ({ roles }) => {
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  if (isCheckingAuth) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (roles && !roles.includes(user?.role)) return <Navigate to="/" replace/>;

  return <Outlet />;
};
export default RoleRoute;
