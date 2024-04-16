import Box from '@mui/material/Box';
import MuiStepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

type TStepperProps = {
    activeStep: number;
    steps: string[];
}

const Stepper = ({ activeStep, steps }: TStepperProps) => {
    return (
        <Box sx={{ width: '100%' }}>
            <MuiStepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </MuiStepper>
        </Box>
    );
}

export default Stepper