import { TailSpin } from "react-loader-spinner";

const LoadingScreen = ({loadingMsg="Loading"}) => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-black">
      <div className="flex flex-col items-center gap-4">
        <TailSpin
          height="80"
          width="80"
          color="#3b82f6" // blue-500
          ariaLabel="loading"
        />
        <p className="text-sm text-gray-300 animate-pulse">{loadingMsg + "..."}</p>
      </div>
    </div>
  );
};
export default LoadingScreen;
