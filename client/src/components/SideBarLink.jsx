import { NavLink } from "react-router-dom";

const SideBarLink = ({ to, sidebarOpen, title, short }) => {
  if (!sidebarOpen && !short) return null;
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium tracking-wide
            ${
              isActive
                ? "bg-white/20 border-white/30 shadow-sm"
                : "hover:bg-white/10 hover:border-white/20"
            }`
      }
    >
      <span className={`transition-all duration-200 ${sidebarOpen ? "opacity-100" : "opacity-80"}`}>
        {sidebarOpen ? title : short}
      </span>
    </NavLink>
  );
};
export default SideBarLink;
