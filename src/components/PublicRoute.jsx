// PublicRoute.jsx
// Route guard that blocks access to the Login page if user is already logged in.

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PublicRoute;

