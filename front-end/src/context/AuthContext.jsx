import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authError, setAuthError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleAuthError = (err) => {
    if (err.response?.status === 401) {
      setAuthError("Your session expired. Please log in again.");
      localStorage.removeItem("authToken");
    }
  };

  const handelSetToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        handleLogout,
        handleAuthError,
        authError,
        token,
        handelSetToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
