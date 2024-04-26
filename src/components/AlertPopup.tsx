import { Alert } from "@mui/material";
import useAlert from "../hooks/useAlert";
import { serializeError } from "../utils/errors";

const AlertPopup = () => {
  const { text, type, useRawMessage } = useAlert();

  if (text && type) {
    const errorText = serializeError(text, useRawMessage);
    return (
      <Alert
        severity={type as "error" | "info" | "success" | "warning"}
        sx={{
          position: "absolute",
          top: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10000,
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
