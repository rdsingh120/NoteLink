const Button = ({ text, ...props }) => {
  return (
    <button
      className="bg-purple-500/70 hover:bg-purple-500 text-white py-2 px-4 rounded-lg 
          backdrop-blur-md transition duration-200 border border-purple-300/30 shadow-lg 
          cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    >
      {text}
    </button>
  );
};
export default Button;
