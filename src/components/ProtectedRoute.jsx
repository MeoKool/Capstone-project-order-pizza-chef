import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // Check if user is logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Check if user has the required role
  if (requiredRole && userRole !== requiredRole) {
    // If user is logged in but doesn't have the right role,
    // redirect to their appropriate page
    if (userRole === "ScreenChef") {
      return <Navigate to="/chef" replace />;
    } else if (userRole === "ScreenWaiter") {
      return <Navigate to="/staff" replace />;
    } else {
      // If role is unknown, log out
      localStorage.clear();
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
