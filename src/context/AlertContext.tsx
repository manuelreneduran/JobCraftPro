import { createContext, useState } from "react";

const ALERT_TIME = 5000;
const initialState = {
  text: "",
  type: "",
  useRawMessage: false,
};

const AlertContext = createContext({
  ...initialState,
  setAlert: (text: string, type: string, useRawMessage?: boolean) => {},
});

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [text, setText] = useState("");
  const [type, setType] = useState("");
  const [useRawMessage, setUseRawMessage] = useState(false);

  const setAlert = (text: string, type: string, useRawMessage?: boolean) => {
    setText(text);
    setType(type);
    setUseRawMessage(!!useRawMessage);

    setTimeout(() => {
      setText("");
      setType("");
      setUseRawMessage(false);
    }, ALERT_TIME);
  };

  return (
    <AlertContext.Provider
      value={{
        text,
        type,
        useRawMessage,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
