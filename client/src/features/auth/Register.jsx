import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Title from "../../components/Title";
import useAuthStore from "../../store/auth.store";
import Error from "../../components/Error";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // AuthStore
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);
  const registerUser = useAuthStore((state) => state.registerUser);

  //Form State
  const [userDetails, setUserDetails] = useState({ name: "", email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  //Register user
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    try {
      await registerUser(userDetails);
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
      <Title text="Register" />
      {error && <Error error={error} />}
      <Input
        label="Name"
        name="name"
        placeholder="Enter your name"
        value={userDetails.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={userDetails.email}
        onChange={handleChange}
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={userDetails.password}
        onChange={handleChange}
        required
      />
      <Button
        text={isLoading ? "Registering..." : "Register"}
        disabled={isLoading || !(userDetails.name && userDetails.email && userDetails.password)}
      />
      <p className="text-sm text-center text-gray-300 mt-2">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 hover:text-blue-300 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};
export default Register;
