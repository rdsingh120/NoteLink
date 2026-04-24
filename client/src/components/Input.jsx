const Input = ({ label, name, type = "text", placeholder, value, onChange, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-300">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 
            placeholder-gray-400 text-white
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
            transition"
        {...props}
      />
    </div>
  );
};
export default Input;
