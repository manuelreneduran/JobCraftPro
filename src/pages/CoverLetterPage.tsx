import { yupResolver } from "@hookform/resolvers/yup"
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Divider, Paper } from '@mui/material'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import Button from "../components/Button"
import SecondaryButton from "../components/SecondaryButton"
import Stepper from "../components/Stepper"
import Typography from "../components/Typography"
import CoreLayout from '../layouts/CoreLayout'
import { useGenerateCoverLetterMutation } from '../services/api'
import { colors } from "../styles/colors"
import { TCoverLetterFormInputs } from '../utils/types'
import { coverLetterFormSchema } from "../utils/validation"

const defaultFormValues: TCoverLetterFormInputs = {
    name: '',
    role: '',
    company: '',
    resume: '',
    jobListing: '',
    length: 200,
    paragraphs: 4
}

const MAX_STEPS = 3

const CoverLetterPage = () => {
    const [activeStep, setActiveStep] = useState<number>(0)

    const [triggerGenerateCoverLetter, { data, isLoading, isError, error }] = useGenerateCoverLetterMutation()

    const {
        handleSubmit,
        control,
        watch
    } = useForm<TCoverLetterFormInputs>({
        defaultValues: defaultFormValues,
        resolver: yupResolver(coverLetterFormSchema)
    })

    const companyName = watch('company')


    let errMsg: string | undefined = ''

    if (error) {
        if ('status' in error) {
            // you can access all properties of `FetchBaseQueryError` here
            errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

        } else {
            // you can access all properties of `SerializedError` here
            errMsg = error.message
        }

    }

    const onSubmit: SubmitHandler<TCoverLetterFormInputs> = (data) => triggerGenerateCoverLetter(data)
    const incrementStep = () => setActiveStep(activeStep + 1)
    const decrementStep = () => setActiveStep(activeStep - 1)

    const steps = [
        'Upload Resume',
        'Select Job',
        'Configure Parameters'
    ]
    return (
        <CoreLayout>
            <Stack height="100%" justifyContent={{ xs: 'inherit', sm: 'center' }} alignItems={{ xs: 'inherit', sm: 'center' }} sx={{ backgroundColor: colors.background.secondary }} >
                <Paper elevation={1} sx={{ display: "flex", width: { xs: '100%', sm: '75%' }, height: { xs: '100%', sm: '75%' } }} >

                    <Stack flex={1} spacing={2} padding={2} justifyContent="space-between" >
                        <Stack spacing={2}>
                            <Typography variant="h5" textAlign="center">Generate Cover Letter</Typography>
                            <Stepper activeStep={activeStep} steps={steps} />
                        </Stack>
                        <Divider />

                        <Typography fontStyle="italic">
                            Leverage the power of AI to build a custom cover letter for your next job application. Upload your resume to get started.
                        </Typography>
                        <Stack flex={2} justifyContent="center" alignItems="center">
                            <SecondaryButton startIcon={<CloudUploadIcon />}
                                sx={{ backgroundColor: colors.button.secondary.main }}>Upload Resume
                            </SecondaryButton>
                        </Stack>

                        <Stack flex={1} direction="row" alignItems="flex-end" justifyContent="space-between">
                            <Button variant="text" disabled={activeStep === 0} onClick={decrementStep}>Back</Button>
                            {
                                activeStep === MAX_STEPS - 1 ? (<Button variant="contained" onClick={incrementStep}>Generate</Button>
                                ) : (<Button variant="text" onClick={incrementStep}>Next</Button>
                                )
                            }
                        </Stack>





                    </Stack>
                </Paper>


            </Stack>

        </CoreLayout>
    )
}

export default CoverLetterPage
