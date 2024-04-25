import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [user, isLoadingAuth] = useAuthState(auth);

  useEffect(() => {
    if (!isLoadingAuth && !user) {
      navigate("/login");
    }
  }, [user, isLoadingAuth, navigate]);

  return children;
};
