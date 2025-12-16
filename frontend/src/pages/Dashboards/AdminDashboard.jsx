import DashboardLayout from "./layout";

const AdminDashboard = () => {
  const stats = [
    {
      label: "Total Projects",
      value: 128,
      description: "All projects in the system",
    },
    {
      label: "Active Projects",
      value: 76,
      description: "Projects with status = active",
    },
    {
      label: "Completed Projects",
      value: 39,
      description: "Projects marked as completed",
    },
    {
      label: "On Hold",
      value: 13,
      description: "Paused or blocked projects",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-white mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-slate-800/60 p-6 shadow ring-1 ring-white/10"
            >
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-500">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;