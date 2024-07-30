import React from "react";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import DynamicSearchForm from "./components/DynamicSearchForm";

// Use the useAuth hook to access authentication state and functions.
const AuthButtons = () => {
  const { isAuthenticated, login, logout } = useAuth();
  return (
    <div className="mb-3">
      {/* Conditional rendering based on authentication state. */}
      {isAuthenticated ? (
        <>
          {/* Show logout button and DynamicSearchForm when authenticated. */}
          <button className="btn btn-secondary float-end" onClick={logout}>
            Logout
          </button>
          <DynamicSearchForm />
        </>
      ) : (
        <>
          {/* Show login prompt and login button when not authenticated. */}
          <h2>Click here to login please...</h2>
          <button className="btn btn-primary" onClick={login}>
            Login
          </button>
        </>
      )}
    </div>
  );
};

const App = () => {
  return (
    // Provide the authentication context to the entire app.
    <AuthProvider>
      <div className="container mt-5">
        <AuthButtons />
      </div>
    </AuthProvider>
  );
};

export default App;
