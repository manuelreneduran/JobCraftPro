import { Typography, TypographyProps } from "@mui/material"



const HelperText = (props: TypographyProps) => {
    return (<Typography fontSize="12px" color="gray" {...props}>
        {props.children}
    </Typography >)
}

export default HelperText