import { Stack, Typography } from "@mui/material";

const ErrorPage = () => {
  return (
    <Stack justifyContent="center" alignItems="center" height="100%">
      <Typography variant="h5">Whoops!</Typography>
      <Typography variant="body1">
        Something went wrong. Please try again later.
      </Typography>
    </Stack>
  );
};

export default ErrorPage;
