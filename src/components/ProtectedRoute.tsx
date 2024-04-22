import { Navigate } from "react-router-dom";
import { auth } from "../services/firebase";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = auth.currentUser;
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
