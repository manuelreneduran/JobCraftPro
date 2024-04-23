import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes, useNavigate } from "react-router-dom";
import AlertPopup from "./components/AlertPopup";
import { ProtectedRoute } from "./components/ProtectedRoute";
import CoverLetterPage from "./pages/CoverLetterPage";
import DashboardPage from "./pages/DashboardPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { auth } from "./services/firebase";
import { EPaths } from "./utils/types";

function App() {
  const navigate = useNavigate();
  const [user, isLoadingAuth] = useAuthState(auth);

  useEffect(() => {
    if (!isLoadingAuth && !user) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, [user, isLoadingAuth, navigate]);

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
