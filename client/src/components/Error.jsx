const Error = ({error}) => {
  return (
    <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-400/30 rounded-lg py-2 px-3">
      {error}
    </div>
  );
}
export default Error