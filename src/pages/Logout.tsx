import { Stack } from "@mui/material";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { auth, logout } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Logout = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      logout();
    }
    navigate("/login");
  }, []);

  return (
    <Stack height="100vh">
      <Loader />
    </Stack>
  );
};

export default Logout;
