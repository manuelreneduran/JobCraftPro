import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import CoverLetterPage from "./pages/CoverLetterPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import { EPaths } from "./utils/types";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path={EPaths.DASHBOARD}
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path={EPaths.LOGIN} element={<LoginPage />} />
        <Route
          path={EPaths.COVER_LETTER}
          element={
            <ProtectedRoute>
              <CoverLetterPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
