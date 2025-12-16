import NavItem from "./NavItem";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

const Sidebar = () => {
  let navigate = useNavigate();
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }
  return (
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <span className="text-lg font-semibold tracking-tight">Consulting Firm</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <div className="mt-3 space-y-1">
            {user.role === "admin" && (
              <NavItem name="Dashboard" to="/dashboard/admin" active={pathname === "/dashboard/admin"} />
            )}
            {user.role === "client" && (
              <NavItem name="Dashboard" to="/dashboard/client" active={pathname === "/dashboard/client"} />
            )}
            {user.role === "admin" && ( 
              <NavItem name="Projects" to="/projects" active={pathname === "/projects"} />
            )}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800 flex items-center gap-3">
          <button
            onClick={handleLogout}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition
              text-slate-400 hover:text-white hover:bg-slate-800`}
          >
            Logout
          </button>
        </div>
      </aside>
  )
}

export default Sidebar;