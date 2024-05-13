import { Stack } from "@mui/material";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { logout } from "../services/firebase/auth";

const Logout = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      logout();
    }
    navigate("/login");
  }, [navigate, user]);

  return (
    <Stack height="100vh">
      <Loader />
    </Stack>
  );
};

export default Logout;
