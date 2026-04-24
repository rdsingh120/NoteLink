import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="self-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 text-center max-w-md w-full shadow-xl">
      {/* 404 Title */}
      <h1 className="text-6xl font-bold mb-4 tracking-wide text-gray-300">404</h1>

      {/* Message */}
      <p className="text-gray-300 mb-6 text-sm">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button text="Go to Dashboard" onClick={() => navigate("/")} />

        <Button text="Go Back" onClick={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default NotFound;
