import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Paper, Stack, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import Typography from "../components/Typography";
import useAlert from "../hooks/useAlert";
import CoreLayout from "../layouts/CoreLayout";
import {
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
    <CoreLayout useHeader={false}>
      <Stack
        height="100%"
        justifyContent={{ xs: "inherit", sm: "center" }}
        alignItems={{ xs: "inherit", sm: "center" }}
      >
        <Paper
          elevation={2}
          sx={{
            display: "flex",
            padding: 4,
            width: { sm: "50%" },
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
          <Link style={{ marginLeft: "auto" }} to="/register">
            Sign Up
          </Link>
        </Paper>
      </Stack>
    </CoreLayout>
  );
};

export default Login;
