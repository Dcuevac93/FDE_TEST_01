import { useEffect, useCallback, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const AuthProvider = ({ children }) => {

  const authUrl = `${import.meta.env.VITE_API_URL}/auth`;
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(() => !!localStorage.getItem("token"));
  

  const getUserData = useCallback(async (activeToken) => {
    const response = await axios.get(`${authUrl}/me`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${activeToken}`,
      },
    });

    const userData = response.data;
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }, [authUrl]);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);

    (async () => {
      try {
        await getUserData(token);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [getUserData, token]);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const response = await axios.post(`${authUrl}/login`, {
        email,
        password,
      }, { headers: { "Content-Type": "application/json" } });
    
      const { access_token: accessToken } = response.data;
      localStorage.setItem("token", accessToken);
      setToken(accessToken);
      await getUserData(accessToken);
    } catch (error) {
      localStorage.removeItem("token");
    }
    setLoading(false);
  };

  const register = async ({ name, email, password }) => {
    try {
      const response = await axios.post(`${authUrl}/register`, {
        name,
        email,
        password,
        role: 'client'
      }, { headers: { "Content-Type": "application/json" } });

      return response.data;
    } catch (error) {
      return undefined;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        register,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;