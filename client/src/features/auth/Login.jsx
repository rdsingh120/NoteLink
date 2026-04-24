import { useState } from "react";
import useAuthStore from "../../store/auth.store";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Error from "../../components/Error";
import Title from "../../components/Title";

const Login = () => {
  const navigate = useNavigate();

  //AuthStore
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);
  const loginUser = useAuthStore((state) => state.loginUser);

  //Form state
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  //Login user
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    try {
      await loginUser(credentials);
      navigate("/");
    } catch (error) {
      // do nothing → store already handled error
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col self-center gap-6 w-full max-w-sm p-8 rounded-2xl 
        bg-white/10 backdrop-blur-xl border border-white/20 
        shadow-2xl text-gray-100"
    >
      <Title text="Login" />

      {error && <Error error={error} />}

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={credentials.email}
        onChange={handleChange}
        required
        autoComplete="email"
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={credentials.password}
        onChange={handleChange}
        required
        autoComplete="current-password"
      />

      <Button
        text={isLoading ? "Logging in..." : "Login"}
        disabled={isLoading || !(credentials.email && credentials.password)}
      />

      <p className="text-sm text-center text-gray-300 mt-2">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-400 hover:text-blue-300 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
};

export default Login;
