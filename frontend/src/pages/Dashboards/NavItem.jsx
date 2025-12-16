import { Link } from "react-router-dom";

const NavItem = ({ name = '', active = false, to = '/' }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 ${active ? "bg-slate-800 text-white" : ""}`}
    >
      <span className="h-6 w-6 rounded-md bg-slate-700 flex items-center justify-center text-xs">
        {name[0]}
      </span>
      {name}
    </Link>
  );
}

export default NavItem;