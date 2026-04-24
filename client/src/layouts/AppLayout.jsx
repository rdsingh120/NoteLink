import { Outlet } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";

const AppLayout = () => {
  return (
    <div className="h-screen bg-linear-to-br from-gray-900 via-black to-black text-white overflow-hidden">
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />
    </div>
  );
};
export default AppLayout;
