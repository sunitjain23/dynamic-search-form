import React, { createContext, useContext, useState } from 'react';

// Create a context for authentication.
const AuthContext = createContext();

// AuthProvider component that provides authentication state and functions.
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isLogin"));

    // Function to set isAuthenticated to true (login).
    const login = () => {
        const isLogin = localStorage.getItem("isLogin");
        if (!isLogin) {
            localStorage.setItem("isLogin", true);
            setIsAuthenticated(true);
        }
    }

    // Function to set isAuthenticated to false (login).
    const logout = () => {
        localStorage.removeItem("isLogin");
        setIsAuthenticated(false);
    }

    // Provide isAuthenticated state and login/logout functions to children components
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
