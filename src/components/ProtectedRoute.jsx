import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children, requiredRole }) {
  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("userRole");

  // Check if user is logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Check if user has the required role
  if (requiredRole && userRole !== requiredRole) {
    // If user is logged in but doesn't have the right role,
    // redirect to their appropriate page
    if (userRole === "Cheff") {
      return <Navigate to="/chef" replace />;
    } else if (userRole === "Staff") {
      return <Navigate to="/staff" replace />;
    } else {
      // If role is unknown, log out
      sessionStorage.clear();
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
