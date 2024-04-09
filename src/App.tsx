import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ROUTES } from "./utils/constants";


function App() {
    return (
        <AuthProvider>

            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                } />
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.DASHBOARD} element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>} />
            </Routes>
        </AuthProvider>
    );
}

export default App;