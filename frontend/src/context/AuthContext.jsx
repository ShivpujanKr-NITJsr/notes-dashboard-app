import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null until checked
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    const userData = JSON.parse(localStorage.getItem("user_data"));

    if (token) {
      setIsAuthenticated(true);
      setUser(userData);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("jwt_token", token);
    localStorage.setItem("user_data", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_data");
    setIsAuthenticated(false);
    setUser(null);
  };

  // Prevent rendering until auth check is complete
  if (isAuthenticated === null) return null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
