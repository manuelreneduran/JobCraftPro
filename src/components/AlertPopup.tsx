import { Alert } from "@mui/material";
import useAlert from "../hooks/useAlert";
import { parseError } from "../utils/errors";

const AlertPopup = () => {
  const { text, type } = useAlert();

  if (text && type) {
    const errorText = parseError(text);
    return (
      <Alert
        severity={type as "error" | "info" | "success" | "warning"}
        sx={{
          position: "absolute",
          top: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        {errorText}
      </Alert>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;
