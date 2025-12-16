import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createProject } from "../../services/api/ProjectsApi";
import { getUsersClientsList } from "../../services/api/UsersApi";
import { useAuth } from "../../auth/useAuth";

const ProjectForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [clientsError, setClientsError] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "active",
  });

  const [clientId, setClientId] = useState("");

  const isAdmin = user?.role === "admin";
  const isClient = user?.role === "client";

  useEffect(() => {
    if (!isAdmin) return;

    setClientsLoading(true);
    setClientsError(null);

    (async () => {
      try {
        const data = await getUsersClientsList();
        setClients(data);
      } catch (err) {
        setClientsError("Failed to load clients");
      } finally {
        setClientsLoading(false);
      }
    })();
  }, [isAdmin]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const resolvedClientId = isAdmin ? Number(clientId) : user?.sub;

      if (!resolvedClientId) {
        setError("Client is required");
        return;
      }

      await createProject({
        ...form,
        clientId: resolvedClientId,
      });
      navigate("/projects");
    } catch (err) {
      setError("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-1/3 bg-slate-950 p-8 text-white">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Add Project</h1>
          <button
            onClick={() => navigate("/projects")}
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Back to projects
          </button>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Project name
              </label>
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="active">Active</option>
                <option value="on-hold">On hold</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {isAdmin && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Client
                </label>
                <select
                  name="clientId"
                  required
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  disabled={clientsLoading}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select a client</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.email})
                    </option>
                  ))}
                </select>
                {clientsError && (
                  <div className="mt-2 text-sm text-red-300">{clientsError}</div>
                )}
              </div>
            )}

            {isClient && (
              <input type="hidden" name="clientId" value={user?.sub ?? ""} />
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-medium"
              >
                {loading ? "Creating..." : "Create project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;