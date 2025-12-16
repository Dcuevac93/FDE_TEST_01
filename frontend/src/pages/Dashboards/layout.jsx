import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="h-full rounded-xl border border-dashed border-slate-800 bg-slate-900/40 flex items-center justify-center">
          {children}
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
