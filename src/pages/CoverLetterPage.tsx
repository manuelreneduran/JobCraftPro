import { yupResolver } from "@hookform/resolvers/yup"
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Divider, Paper } from '@mui/material'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import Button from "../components/Button"
import Input from "../components/Input"
import SecondaryButton from "../components/SecondaryButton"
import Stepper from "../components/Stepper"
import Typography from "../components/Typography"
import CoreLayout from '../layouts/CoreLayout'
import { useGenerateCoverLetterMutation } from '../services/api'
import { colors } from "../styles/colors"
import { TCoverLetterFormInputs } from '../utils/types'
import { coverLetterFormSchema } from "../utils/validation"

const defaultFormValues: TCoverLetterFormInputs = {
    resume: {
        resumeText: '',
        resumePDF: undefined
    },
    jobListing: {
        jobListingText: ''
    },
    parameters: {
        name: '',
        company: '',
        role: '',
        length: 0,
        paragraphs: 0
    }
}

const MAX_STEPS = 3

const CoverLetterPage = () => {
    const [activeStep, setActiveStep] = useState<number>(0)

    const [triggerGenerateCoverLetter] = useGenerateCoverLetterMutation()

    const {
        handleSubmit,
        formState: { errors: formErrors },
        control,
        watch,
        trigger,
        setValue
    } = useForm<TCoverLetterFormInputs>({
        defaultValues: defaultFormValues,
        resolver: yupResolver(coverLetterFormSchema)
    })


    const resumePDF = watch('resume.resumePDF')

    const onSubmit: SubmitHandler<TCoverLetterFormInputs> = (data) => triggerGenerateCoverLetter(data)

    const incrementStep = async () => {
        if (await validateStep(activeStep)) {
            setActiveStep(activeStep + 1)
        }
    }

    const decrementStep = () => setActiveStep(activeStep - 1)

    const steps = [
        'Upload Resume',
        'Upload Job Description',
        'Configure Parameters'
    ]

    const validateStep = async (activeStep: number) => {
        switch (activeStep) {
            case 0:
                return await trigger('resume.resumeText')
            case 1:
                return true
            case 2:
                return true
            default:
                return false
        }
    }
    return (
        <CoreLayout>
            <Stack height="100%" justifyContent={{ xs: 'inherit', sm: 'center' }} alignItems={{ xs: 'inherit', sm: 'center' }} sx={{ backgroundColor: colors.background.secondary }} >
                <Paper elevation={1} sx={{ display: "flex", width: { xs: '100%', sm: '75%' }, height: { xs: '100%', sm: '75%' } }} >

                    <Stack flex={1} padding={2}  >
                        <Stack spacing={2}>
                            <Typography variant="h5" textAlign="center">Generate Cover Letter</Typography>
                            <Stepper activeStep={activeStep} steps={steps} />
                        </Stack>
                        <Divider sx={{ marginY: '2rem' }} />

                        <Typography fontStyle="italic">
                            Leverage the power of AI to build a custom cover letter for your next job application. Upload your resume to get started.
                        </Typography>
                        <form style={{ flex: 1, flexDirection: 'column', display: 'flex', justifyContent: 'space-between' }} onSubmit={handleSubmit(onSubmit)}>

                            <Stack flex={2} justifyContent="center" alignItems="center">
                                {
                                    activeStep === 0 ? (
                                        <>

                                            <Button component="label" role={undefined} startIcon={<CloudUploadIcon />}
                                                color={!resumePDF ? "secondary" : "success"}>{!resumePDF ? 'Upload Resume' : 'Resume Uploaded'}

                                                <input style={{ display: 'none' }} type="file" accept=".pdf"
                                                    onChange={(e: any) => setValue('resume.resumePDF', e.target.files[0])}
                                                />


                                            </Button>
                                            {formErrors.resume?.resumeText && <Typography color="error">{formErrors.resume?.resumeText.message}</Typography>}

                                        </>
                                    ) : activeStep === 1 ? (
                                        <SecondaryButton startIcon={<CloudUploadIcon />}
                                            sx={{ backgroundColor: colors.button.secondary.main }}>Upload Job Description
                                        </SecondaryButton>
                                    ) : (
                                        <Input
                                            name="name"
                                            label="Your Name"
                                            placeholder="John Doe"
                                            required />
                                    )
                                }

                            </Stack>

                            <Stack flex={1} direction="row" alignItems="flex-end" justifyContent="space-between">
                                <Button variant="text" disabled={activeStep === 0} onClick={decrementStep}>Back</Button>
                                {
                                    activeStep === MAX_STEPS - 1 ? (<Button variant="contained" type="submit">Generate</Button>
                                    ) : (<Button variant="text" onClick={incrementStep}>Next</Button>
                                    )
                                }
                            </Stack>
                        </form>

                    </Stack>
                </Paper>


            </Stack>

        </CoreLayout>
    )
}

export default CoverLetterPage
