import { Stack } from "@mui/material";

type PublicLayoutProps = {
  children: React.ReactNode;
};

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <Stack height="100vh" justifyContent="center" alignItems="center">
      {children}
    </Stack>
  );
};

export default PublicLayout;
