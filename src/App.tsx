import { Route, Routes } from "react-router-dom";
import AlertPopup from "./components/AlertPopup";
import { ProtectedRoute } from "./components/ProtectedRoute";
import CoverLetterDetailPage from "./pages/CoverLetterDetailPage";
import GenerateCoverLetterPage from "./pages/GenerateCoverLetterPage";
import DashboardPage from "./pages/DashboardPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { EPaths } from "./utils/types";
import Logout from "./pages/Logout";
import CoverLetterPage from "./pages/CoverLetterPage";

function App() {
  return (
    <>
      <AlertPopup />
      <Routes>
        <Route path={EPaths.LOGIN} element={<LoginPage />} />
        <Route path={EPaths.REGISTER} element={<RegisterPage />} />
        <Route path={EPaths.RESET_PASSWORD} element={<ResetPasswordPage />} />
        <Route path={EPaths.LOGOUT} element={<Logout />} />
        <Route
          path={EPaths.DASHBOARD}
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path={EPaths.COVER_LETTER} element={<CoverLetterPage />} />
        <Route
          path={EPaths.COVER_LETTER_DETAIL}
          element={<CoverLetterDetailPage />}
        />

        <Route
          path={EPaths.GENERATE_COVER_LETTER}
          element={
            <ProtectedRoute>
              <GenerateCoverLetterPage />
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
