import { FormControl } from "@mui/material";
import MuiOutlinedInput, {
  OutlinedInputProps,
} from "@mui/material/OutlinedInput";
import HelperText from "./HelperText";
import Typography from "./Typography";
import { forwardRef } from "react";

type TInputProps = {
  helperText?: string | JSX.Element;
  errorText?: string;
} & OutlinedInputProps;
const Input = (
  { helperText, label, errorText, ...props }: TInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  return (
    <FormControl>
      <Typography fontSize="14px">{label}</Typography>
      <MuiOutlinedInput color="secondary" ref={ref} {...props} size="small" />
      {helperText && !props.error && <HelperText>{helperText}</HelperText>}
      {errorText && <HelperText color="error">{errorText}</HelperText>}
    </FormControl>
  );
};

export default forwardRef(Input);
