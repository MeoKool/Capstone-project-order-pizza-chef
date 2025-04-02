import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ChefPage from "../pages/ChefPage";
import StaffPage from "../pages/StaffPage";
import NotFound from "../pages/NotFound";
import { ProtectedRoute } from "../components/ProtectedRoute";

const RouterIndex = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/chef"
          element={
            <ProtectedRoute requiredRole="Cheff">
              <ChefPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff"
          element={
            <ProtectedRoute requiredRole="Staff">
              <StaffPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouterIndex;
