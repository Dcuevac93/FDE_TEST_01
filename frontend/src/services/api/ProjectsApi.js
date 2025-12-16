import apiClient from "./apiClient";

const createProject = async (project) => {
  const url = "/projects";
  const { data } = await apiClient.post(url, project);
  return data;
};

const getProjectsList = async () => {
  const url = "/projects";
  const { data } = await apiClient.get(url);
  return data;
};

const getProjectsByUser = async (userId) => {
  const url = `/users/${userId}/projects`;
  const { data } = await apiClient.get(url);
  return data;
};

const getProjectDetails = async (projectId) => {
  const url = `/projects/${projectId}`;
  const { data } = await apiClient.get(url);
  return data;
};

// ───────────── Comments ─────────────

const addProjectComment = async (projectId, comment) => {
  const url = `/projects/${projectId}/comments`;
  const { data } = await apiClient.post(url, comment);
  return data;
};

const getProjectComments = async (projectId) => {
  const url = `/projects/${projectId}/comments`;
  const { data } = await apiClient.get(url);
  return data;
};

export {
  createProject,
  getProjectsList,
  getProjectsByUser,
  getProjectDetails,
  addProjectComment,
  getProjectComments,
};
