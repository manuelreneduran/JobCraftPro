import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, ButtonProps } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
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
      startIcon={!success ? <CloudUploadIcon /> : <CheckIcon />}
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
