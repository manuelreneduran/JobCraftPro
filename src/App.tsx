import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CoverLetterPage from "./pages/CoverLetterPage";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ROUTES } from "./utils/constants";
import DashboardPage from "./pages/DashboardPage";


function App() {
    return (
        <AuthProvider>

            <Routes>
                <Route path={ROUTES.DASHBOARD} element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                } />
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.COVER_LETTER} element={
                    <ProtectedRoute>
                        <CoverLetterPage />
                    </ProtectedRoute>} />
            </Routes>
        </AuthProvider>
    );
}

export default App;