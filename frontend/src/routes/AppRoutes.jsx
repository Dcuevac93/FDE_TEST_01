import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "../auth/ProtectedRoute";
import Register from "../pages/Register";

import DashboardLayout from "../pages/Dashboards/layout";
import ClientDashboard from "../pages/Dashboards/ClientDashboard";
import AdminDashboard from "../pages/Dashboards/AdminDashboard";
import ProjectsView from "../pages/Projects/ProjectsView";
import ProjectDetailsView from "../pages/Projects/ProjectDetailsView";
import ProjectForm from "../pages/Projects/ProjectForm";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/client"
        element={
          <ProtectedRoute roles={["client"]}>
            <ClientDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="projects" element={<DashboardLayout />}>
        <Route index element={
            <ProtectedRoute roles={["admin"]}>
              <ProjectsView />
            </ProtectedRoute>
          }
        />
        <Route path="add" element={
            <ProtectedRoute roles={["admin", "client"]}>
              <ProjectForm />
            </ProtectedRoute>
          } 
        />
        <Route path=":id" element={
            <ProtectedRoute roles={["admin", "client"]}>
              <ProjectDetailsView />
            </ProtectedRoute>
          } 
        />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
