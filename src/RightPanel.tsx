import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Panel from './components/Panel';
import theme from './theme';

type RightPanelProps = {
    text?: string;
}
const RightPanel = ({ text }: RightPanelProps) => {

    return (
        <Panel sx={{
            marginLeft: theme.spacing(1),
        }}>
            <Stack spacing={2}>
                <Typography >{text}</Typography>
            </Stack>
        </Panel>
    )
}

export default RightPanel;