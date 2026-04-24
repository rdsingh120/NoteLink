// src\App.jsx

import { useEffect } from "react";
import useAuthStore from "./store/auth.store";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PublicOnlyRoute from "./routes/PublicOnlyRoute";
import RoleRoute from "./routes/RoleRoute";
import NotFound from "./features/auth/NotFound";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import NewNote from "./features/notes/NewNote";
import Note from "./features/notes/Note";
import SharedNote from "./pages/SharedNote";
import HomePage from "./pages/HomePage";

const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <div>Loading...</div>;

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route element={<RoleRoute />}>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<HomePage />} />
            <Route path="new" element={<NewNote />} />
            <Route path="n/:noteId" element={<Note />} />
          </Route>
        </Route>
        <Route path="s/:noteId" element={<SharedNote />} />
      </Route>
    </Routes>
  );
};
export default App;
