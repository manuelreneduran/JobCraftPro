import { Button, ButtonProps } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type UploadButtonProps = {
  onChange: (e: any) => void;
  success: boolean;
  text: string;
} & ButtonProps;

const UploadButton = ({
  onChange,
  success,
  text,
  ...rest
}: UploadButtonProps) => {
  return (
    <Button
      component="label"
      role={undefined}
      startIcon={<CloudUploadIcon />}
      color={!success ? "secondary" : "success"}
      {...rest}
    >
      {text}
      <input
        style={{ display: "none" }}
        type="file"
        accept=".pdf"
        onChange={onChange}
      />
    </Button>
  );
};

export default UploadButton;
