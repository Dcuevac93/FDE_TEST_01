import { Link } from "react-router-dom";

const ProjectsTable = ({ projects = [] }) => {
  const statusStyles = {
    active: 'bg-yellow-500/10 text-yellow-400',
    completed: 'bg-green-500/10 text-green-400',
    'on-hold': 'bg-gray-500/10 text-gray-400',
  }

  return (
    <table className="min-w-full divide-y divide-white/10">
      <thead>
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">
            Project
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">
            Description
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">
            Status
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">
            Created
          </th>
          <th />
        </tr>
      </thead>

      <tbody className="divide-y divide-white/5">
        {projects.map((project) => (
          <tr key={project.id}>
            <td className="px-4 py-4 text-sm font-medium text-white">
              {project.name}
            </td>
            <td className="px-4 py-4 text-sm text-slate-400">
              {project.description}
            </td>
            <td className="px-4 py-4">
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusStyles[project.status]}`}
              >
                {project.status}
              </span>
            </td>
            <td className="px-4 py-4 text-sm text-slate-400">
              {new Date(project.createdAt).toLocaleDateString()}
            </td>
            <td className="px-4 py-4 text-right text-sm">
              <Link to={`/projects/${project.id}`} className="text-indigo-400 hover:text-indigo-300">
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProjectsTable