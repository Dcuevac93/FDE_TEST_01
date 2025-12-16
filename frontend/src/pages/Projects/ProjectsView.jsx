import { useEffect, useState } from "react";
import { getProjectsList } from "../../services/api/ProjectsApi";
import ProjectsTable from "../../components/ProjectsTable";
import { useNavigate } from "react-router-dom";

const ProjectsView = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    (async () => {
      const projects = await getProjectsList();
      setProjects(projects);
    })();
  }, []);

  return (
    <div className="p-6">
      <div className="rounded-xl bg-slate-900/80 border border-white/10 p-6">
        <h2 className="text-lg font-semibold text-white">Projects</h2>
        <p className="mt-1 text-sm text-slate-400">A list of projects.</p>
        <button
          onClick={() => navigate("/projects/add")}
          className="mt-6 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Add Project
        </button>

        <div className="mt-6 overflow-x-auto">
          <ProjectsTable projects={projects} />
        </div>
      </div>
    </div>
  );
};

export default ProjectsView;