import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Typography from "../components/Typography";
import CoreLayout from "../layouts/CoreLayout";
import { auth, registerWithEmailAndPassword } from "../services/firebase";
import { TRegistrationFormInputs } from "../utils/types";
import { registerFormSchema } from "../utils/validation";
import { useAuthState } from "react-firebase-hooks/auth";

const defaultRegisterFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, loading]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TRegistrationFormInputs>({
    mode: "onChange",
    defaultValues: defaultRegisterFormValues,
    resolver: yupResolver(registerFormSchema),
  });

  const onSubmit: SubmitHandler<TRegistrationFormInputs> = async ({
    email,
    password,
    confirmPassword,
  }) => {
    if (password === confirmPassword) {
      await registerWithEmailAndPassword(email, password);
    } else {
      alert("Passwords do not match");
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
            width: { sm: "40%" },
            height: { xs: "100%", sm: "60%" },
            flexDirection: "column",
            justifyContent: { xs: "center", sm: "space-between" },
          }}
        >
          <Typography variant="h4">Sign up</Typography>

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
                  type="email"
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
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  size="small"
                  color="secondary"
                  type="password"
                  placeholder="Confirm Password"
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword?.message
                      ? errors.confirmPassword.message
                      : " "
                  }
                />
              )}
            />
            <span>
              <Link to="/login">Already have an account?</Link>
            </span>
            <Button
              sx={{ margin: "2rem 0 1rem 0" }}
              variant="contained"
              type="submit"
            >
              Create Account
            </Button>
          </form>
        </Paper>
      </Stack>
    </CoreLayout>
  );
};

export default RegisterPage;
