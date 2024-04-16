import { yupResolver } from "@hookform/resolvers/yup"
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Divider, LinearProgress, Paper } from '@mui/material'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import Button from "../components/Button"
import HelperText from '../components/HelperText'
import Typography from "../components/Typography"
import CoreLayout from '../layouts/CoreLayout'
import { useGenerateCoverLetterMutation } from '../services/api'
import { colors } from "../styles/colors"
import { TCoverLetterFormInputs } from '../utils/types'
import { coverLetterFormSchema } from "../utils/validation"
import SecondaryButton from "../components/SecondaryButton"

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
    const [step, setStep] = useState<number>(0)

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
    const incrementStep = () => setStep(step + 1)
    const decrementStep = () => setStep(step - 1)
    return (
        <CoreLayout>
            <Stack height="100%" justifyContent={{ xs: 'inherit', sm: 'center' }} alignItems={{ xs: 'inherit', sm: 'center' }} sx={{ backgroundColor: colors.background.secondary }} >
                <Paper elevation={1} sx={{ display: "flex", width: { xs: '100%', sm: '75%' }, height: { xs: '100%', sm: '75%' } }} >

                    <Stack flex={1} spacing={2} padding={2} justifyContent="space-between" >
                        <Stack>
                            <Typography variant="h5">Generate Cover Letter</Typography>
                            <Stack>
                                <LinearProgress variant="determinate" value={step * (100 / MAX_STEPS)} />
                                <HelperText sx={{ marginTop: '.2rem' }}>Steps {step + 1} of 3</HelperText>
                            </Stack>
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
                        {
                            step === 0 && (
                                <>
                                    <Stack flex={1} direction="row" alignItems="flex-end" justifyContent="flex-end">
                                        <Button sx={{ flex: 1 }} onClick={incrementStep}>Next</Button>
                                    </Stack>
                                </>
                            )
                        }

                        {
                            step === 1 && (
                                <>
                                    <Stack flex={1} direction="row" alignItems="flex-end" spacing={2}>
                                        <Button sx={{ flex: 1 }} onClick={decrementStep}>Back</Button>
                                        <Button sx={{ flex: 1 }} onClick={incrementStep}>Next</Button>
                                    </Stack>
                                </>
                            )
                        }


                        {
                            step === 2 && (
                                <>
                                    <Stack flex={1} direction="row" alignItems="flex-end" spacing={2}>
                                        <Button sx={{ flex: 1 }} onClick={decrementStep}>Back</Button>
                                        <Button sx={{ flex: 1 }} onClick={incrementStep}>Generate</Button>
                                    </Stack>
                                </>
                            )
                        }

                    </Stack>
                </Paper>


            </Stack>

        </CoreLayout>
    )
}

export default CoverLetterPage
