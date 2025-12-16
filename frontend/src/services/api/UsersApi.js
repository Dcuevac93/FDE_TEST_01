import apiClient from "./apiClient";

const getUsersList = async () => {
  const url = "/users";
  const { data } = await apiClient.get(url);
  return data;
};

const getUsersClientsList = async () => {
  const url = "/users/clients";
  const { data } = await apiClient.get(url);
  return data;
};

export {
  getUsersList,
  getUsersClientsList
};
