import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles';

const Panel = styled(Box)(({ theme }) => ({
    flex: 1,
    border: '1px solid black',
    padding: theme.spacing(2),
}));


export default Panel as React.FC<BoxProps> 
