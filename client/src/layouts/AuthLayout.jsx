import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <Outlet />
    </div>
  );
};
export default AuthLayout;
