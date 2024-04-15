import { FormControl, Typography } from '@mui/material';
import MuiOutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import HelperText from './HelperText';

type TInputProps = {
    helperText?: string | JSX.Element
} & OutlinedInputProps
const Input = ({ helperText, label, ...props }: TInputProps) => {
    return (
        <FormControl>
            <Typography>{label}</Typography>
            <MuiOutlinedInput {...props} />
            <HelperText>{helperText}</HelperText>
        </FormControl>
    )
}

export default Input