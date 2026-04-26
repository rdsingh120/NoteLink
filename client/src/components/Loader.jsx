import { TailSpin } from "react-loader-spinner";

const Loader = ({ loadingMsg = "Loading" }) => {
  return (
    <div className="flex flex-col items-center gap-4 m-auto">
      <TailSpin
        height="80"
        width="80"
        color="#3b82f6" // blue-500
        ariaLabel="loading"
      />
      <p className="text-sm text-gray-300 animate-pulse">{loadingMsg + "..."}</p>
    </div>
  );
};
export default Loader;
