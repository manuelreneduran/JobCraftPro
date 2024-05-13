import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, TextField } from "@mui/material";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import Typography from "../components/Typography";
import useAlert from "../hooks/useAlert";
import PublicLayout from "../layouts/PublicLayout";
import { auth } from "../services/firebase";
import { registerWithEmailAndPassword } from "../services/firebase/auth";
import { TRegistrationFormInputs } from "../utils/types";
import { registerFormSchema } from "../utils/validation";

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

  const { setErrorAlert } = useAlert();

  const onSubmit: SubmitHandler<TRegistrationFormInputs> = async ({
    email,
    password,
  }) => {
    try {
      await registerWithEmailAndPassword(email, password);
    } catch (e: unknown) {
      setErrorAlert(e);
    }
  };

  return (
    <PublicLayout>
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          padding: 4,
          width: { sm: "40%" },
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
          Sign up
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
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message ? errors.email.message : " "}
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
    </PublicLayout>
  );
};

export default RegisterPage;
