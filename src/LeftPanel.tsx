import Stack from '@mui/material/Stack';
import Panel from './components/Panel';
import Textfield from '@mui/material/TextField';

import theme from './theme';
import { useState } from 'react';
import GradientButton from './components/Button';
const LeftPanel = () => {
    const [form, setForm] = useState({
        resume: '',
        jobListing: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <Panel sx={{
            marginRight: theme.spacing(1),
        }}>
            <Stack spacing={2} >
                <Textfield onChange={handleChange} name="resume" rows={4} multiline label="Input" variant="outlined" />
                <Textfield onChange={handleChange} name="jobListing" rows={4} multiline label="Input" variant="outlined" />

            </Stack>
        </Panel>
    )
}

export default LeftPanel;