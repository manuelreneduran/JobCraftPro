import Stack from '@mui/material/Stack';
import Panel from './components/Panel';
import theme from './theme';
import { useState } from 'react';
import { Typography } from '@mui/material';

const RightPanel = () => {
    const [coverLetter, setCoverLetter] = useState('');

    return (
        <Panel sx={{
            marginLeft: theme.spacing(1),
        }}>
            <Stack spacing={2}>
                <Typography >{coverLetter}</Typography>
            </Stack>
        </Panel>
    )
}

export default RightPanel;