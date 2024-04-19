import { Stack, Typography } from "@mui/material";

type LoaderProps = {
  text?: string;
};

const Loader = ({ text }: LoaderProps) => {
  return (
    <Stack>
      <div className="jcp-spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
        <div className="rect6"></div>
      </div>
      <Typography variant="body1">{text}</Typography>
    </Stack>
  );
};

export default Loader;
