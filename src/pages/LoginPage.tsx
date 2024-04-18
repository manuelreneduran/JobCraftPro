import { Alert, Container } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import GoogleAuth from "../components/GoogleAuth";
import { useAuth } from "../hooks/useAuth";
import { CredentialResponse } from "@react-oauth/google";

const Login = () => {
  const [authError, setAuthError] = useState<boolean>(false);

  const { login } = useAuth();
  const onAuthSuccess = (res: CredentialResponse) => {
    if (!res.credential) return onAuthError();

    login(jwtDecode(res.credential));
  };

  const onAuthError = () => {
    setAuthError(true);
    setTimeout(() => {
      setAuthError(false);
    }, 5000);
  };
  return (
    <Container>
      <GoogleAuth onError={onAuthError} onSuccess={onAuthSuccess} />
      {authError && <Alert severity="error">Authentication failed</Alert>}
    </Container>
  );
};

export default Login;
