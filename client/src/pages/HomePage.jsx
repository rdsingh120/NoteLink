import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-300 mb-4">Welcome to NoteLink</h1>

        <Link
          to="/new"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-500 text-lg font-medium transition duration-300"
        >
          <FaPlus className="text-sm" />
          Create your first note
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
