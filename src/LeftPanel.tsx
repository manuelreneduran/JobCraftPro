import Stack from '@mui/material/Stack';
import Panel from './components/Panel';
import theme from './theme';
const LeftPanel = () => {
    return (
        <Panel sx={{
            marginRight: theme.spacing(1),
        }}>
            <Stack spacing={2} >

            </Stack>
        </Panel>
    )
}

export default LeftPanel;