import Loader from "./Loader";

const LoadingScreen = ({ loadingMsg  }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-black">
      <Loader loadingMsg={loadingMsg} />
    </div>
  );
};
export default LoadingScreen;
