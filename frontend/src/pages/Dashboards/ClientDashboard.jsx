import { useState, useEffect } from "react";
import DashboardLayout from "./layout";
import { getProjectsByUser } from "../../services/api/ProjectsApi";
import { useAuth } from "../../auth/useAuth";
import ProjectsTable from "../../components/ProjectsTable";

const ClientDashboard = () => {

  const [projects, setProjects] = useState([]);
  const { user } = useAuth();
  
  useEffect(() => {
    (async () => {
      const projects = await getProjectsByUser(user.sub);
      setProjects(projects);
    })()
  }, [user.sub])

    return (
        <DashboardLayout>
          <div className="p-6">
            <div className="rounded-xl bg-slate-900/80 border border-white/10 p-6">
              <h2 className="text-lg font-semibold text-white">My Projects</h2>
              <p className="mt-1 text-sm text-slate-400">
                A list of projects assigned to you.
              </p>

              <div className="mt-6 overflow-x-auto">
                <ProjectsTable projects={projects} />
              </div>
            </div>
          </div>
        </DashboardLayout>
    )
}

export default ClientDashboard