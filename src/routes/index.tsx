import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/auth";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
    </Routes>
  );
}
