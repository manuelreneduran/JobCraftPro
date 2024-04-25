import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Paper, Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import Loader from "../components/Loader";
import Typography from "../components/Typography";
import useAlert from "../hooks/useAlert";
import PublicLayout from "../layouts/PublicLayout";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../services/firebase";
import { TLoginFormInputs } from "../utils/types";
import { loginFormSchema } from "../utils/validation";

const defaultLoginFormValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();

  const [user, isLoadingAuth] = useAuthState(auth);

  // if the user is logged in, redirect to the dashboard
  useEffect(() => {
    if (!isLoadingAuth && user) navigate("/dashboard");
  }, [user, isLoadingAuth]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TLoginFormInputs>({
    defaultValues: defaultLoginFormValues,
    resolver: yupResolver(loginFormSchema),
  });

  const { setAlert } = useAlert();

  const onSubmit: SubmitHandler<TLoginFormInputs> = async ({
    email,
    password,
  }) => {
    try {
      await logInWithEmailAndPassword(email, password);
    } catch (e: any) {
      setAlert(e.message, "error");
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (e: any) {
      setAlert(e.message, "error");
    }
  };

  return (
    <PublicLayout>
      {isLoadingAuth ? (
        <Loader />
      ) : (
        <Paper
          elevation={2}
          sx={{
            display: "flex",
            padding: 4,
            width: { xs: "90%", sm: "50%", md: "40%" },
            height: { xs: "100%", sm: "70%" },
            flexDirection: "column",
            justifyContent: { xs: "center", sm: "space-between" },
          }}
        >
          <img
            style={{
              height: "56px",
              width: "auto",
            }}
            src={logo}
            alt="JobCraftPro Logo"
          />
          <Typography textAlign="center" variant="h4">
            Sign in
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "1rem",
            }}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  size="small"
                  color="secondary"
                  placeholder="Email"
                  error={!!errors.email}
                  helperText={
                    errors.email?.message ? errors.email.message : " "
                  }
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  size="small"
                  color="secondary"
                  type="password"
                  placeholder="Password"
                  error={!!errors.password}
                  helperText={
                    errors.password?.message ? errors.password.message : " "
                  }
                />
              )}
            />
            <span>
              <Link to="/reset-password">Forgot password?</Link>
            </span>
            <Stack flex={1} justifyContent="flex-end">
              <Button
                sx={{ margin: "2rem 0 1rem 0" }}
                variant="contained"
                type="submit"
              >
                Sign In
              </Button>
              <Divider>or</Divider>
              <Button
                sx={{
                  marginTop: "1rem",
                }}
                variant="outlined"
                color="secondary"
                aria-label="Sign in with Google"
                onClick={handleSignInWithGoogle}
                startIcon={
                  <img
                    src="https://img.icons8.com/color/48/000000/google-logo.png"
                    alt="Google Logo"
                    style={{ width: "1.5rem", height: "1.5rem" }}
                  />
                }
              >
                Sign in with Google
              </Button>
            </Stack>
          </form>
          <Link
            style={{ marginLeft: "auto", marginTop: "1rem" }}
            to="/register"
          >
            Sign Up
          </Link>
        </Paper>
      )}
    </PublicLayout>
  );
};

export default Login;
