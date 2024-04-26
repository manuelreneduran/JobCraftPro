import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Typography from "../components/Typography";
import useAlert from "../hooks/useAlert";
import PublicLayout from "../layouts/PublicLayout";
import { auth } from "../services/firebase";
import { TResetPasswordFormInputs } from "../utils/types";
import { resetPasswordFormSchema } from "../utils/validation";
import { sendPasswordReset } from "../services/firebase/auth";

const defaultResetPasswordFormValues = {
  email: "",
};

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, loading]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TResetPasswordFormInputs>({
    defaultValues: defaultResetPasswordFormValues,
    resolver: yupResolver(resetPasswordFormSchema),
  });

  const { setAlert } = useAlert();

  const onSubmit: SubmitHandler<TResetPasswordFormInputs> = async ({
    email,
  }) => {
    try {
      await sendPasswordReset(email);
      setAlert(
        "If email is valid a password reset email has been sent",
        "success"
      );
    } catch {}
  };

  return (
    <PublicLayout>
      {loading ? (
        <Loader />
      ) : (
        <Paper
          elevation={2}
          sx={{
            display: "flex",
            padding: 4,
            width: { sm: "40%" },
            height: { xs: "100%", sm: "30%" },
            flexDirection: "column",
            justifyContent: { xs: "center", sm: "space-between" },
          }}
        >
          <Typography variant="h4">Reset Password</Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "1rem",
              justifyContent: "center",
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
            <span>
              <Link to="/login">Sign in</Link>
            </span>
            <Stack flex={1} justifyContent="flex-end">
              <Button
                sx={{ margin: "2rem 0 1rem 0" }}
                variant="contained"
                type="submit"
              >
                Reset Password
              </Button>
            </Stack>
          </form>
        </Paper>
      )}
    </PublicLayout>
  );
};

export default ResetPasswordPage;
