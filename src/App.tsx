import { Route, Routes, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import CoverLetterPage from "./pages/CoverLetterPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { EPaths } from "./utils/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./services/firebase";
import { useEffect } from "react";
import AlertPopup from "./components/AlertPopup";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <>
      <AlertPopup />
      <Routes>
        <Route path={EPaths.LOGIN} element={<LoginPage />} />
        <Route path={EPaths.REGISTER} element={<RegisterPage />} />
        <Route path={EPaths.RESET_PASSWORD} element={<ResetPasswordPage />} />
        <Route
          path={EPaths.DASHBOARD}
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={EPaths.COVER_LETTER}
          element={
            <ProtectedRoute>
              <CoverLetterPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
