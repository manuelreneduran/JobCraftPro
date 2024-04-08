import Stack from '@mui/material/Stack';
import Textfield from '@mui/material/TextField';
import Panel from './components/Panel';
import theme from './theme';

type LeftPanelProps = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const LeftPanel = ({ handleChange }: LeftPanelProps) => {


    return (
        <Panel sx={{
            marginRight: theme.spacing(1),
        }}>
            <Stack spacing={2} >
                <Textfield onChange={handleChange} name="resumeText" rows={4} multiline label="Input" variant="outlined" />
                <Textfield onChange={handleChange} name="jobListingText" rows={4} multiline label="Input" variant="outlined" />

            </Stack>
        </Panel>
    )
}

export default LeftPanel;