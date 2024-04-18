import { FormControl } from "@mui/material";
import MuiOutlinedInput, {
  OutlinedInputProps,
} from "@mui/material/OutlinedInput";
import HelperText from "./HelperText";
import Typography from "./Typography";
import { forwardRef } from "react";

type TInputProps = {
  helperText?: string | JSX.Element;
} & OutlinedInputProps;
const Input = (
  { helperText, label, ...props }: TInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  return (
    <FormControl>
      <Typography sx={{ opacity: 0.8 }}>{label}</Typography>
      <MuiOutlinedInput ref={ref} {...props} size="small" />
      <HelperText>{helperText}</HelperText>
    </FormControl>
  );
};

export default forwardRef(Input);
