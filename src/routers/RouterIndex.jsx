import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ChefPage from "../pages/ChefPage";
import StaffPage from "../pages/StaffPage";
import NotFound from "../pages/NotFound";

const RouterIndex = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chef" element={<ChefPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouterIndex;
