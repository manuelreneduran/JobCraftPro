import { TypographyProps } from "@mui/material"
import Typography from "./Typography"



const HelperText = (props: TypographyProps) => {
    return (<Typography fontSize="12px" color="gray" {...props}>
        {props.children}
    </Typography >)
}

export default HelperText