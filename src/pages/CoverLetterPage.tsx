import { yupResolver } from "@hookform/resolvers/yup"
import { Divider, LinearProgress, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import HelperText from '../components/HelperText'
import CoreLayout from '../layouts/CoreLayout'
import { useGenerateCoverLetterMutation } from '../services/api'
import { TCoverLetterFormInputs } from '../utils/types'
import { coverLetterFormSchema } from "../utils/validation"
import Button from "../components/Button"
import Input from "../components/Input"

const defaultFormValues: TCoverLetterFormInputs = {
    name: '',
    role: '',
    resume: '',
    jobListing: '',
    length: 200,
    paragraphs: 4
}

const MAX_STEPS = 3

const CoverLetterPage = () => {
    const [step, setStep] = useState<number>(1)

    const [triggerGenerateCoverLetter, { data, isLoading, isError, error }] = useGenerateCoverLetterMutation()

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TCoverLetterFormInputs>({
        defaultValues: defaultFormValues,
        resolver: yupResolver(coverLetterFormSchema)
    })

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
            <Stack direction="row" height="100%">
                <Stack flex={2} spacing={2} padding={2}>
                    <Typography variant="h5">Cover Letter</Typography>
                    <Stack>
                        <LinearProgress variant="determinate" value={step * (100 / MAX_STEPS)} />
                        <HelperText sx={{ marginTop: '.2rem' }}>Steps {step} of 3</HelperText>
                    </Stack>
                    <Divider />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2} className="form">
                            {step === 1 && (
                                <>
                                    <Typography variant="h6" color="textPrimary" >Personal Details</Typography>

                                    <Controller
                                        name="name"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => <Input label="Full Name"  {...field} />}
                                    />

                                    <Controller
                                        name="resume"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => <Input
                                            helperText="
                                        Copy and Paste your resume here.
                                    "
                                            multiline rows={4} label="Resume"  {...field} />}
                                    />
                                    <Button onClick={incrementStep}>Next</Button>

                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <Typography variant="h6" color="textPrimary" >Position Details</Typography>

                                    <Controller
                                        name="role"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => <Input label="Role"   {...field} />}
                                    />
                                    <Controller
                                        name="jobListing"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => <Input
                                            helperText="Include only the important parts, i.e. required skills, about the company, etc."
                                            multiline rows={4} label="Job Listing"   {...field} />}
                                    />

                                    <Stack direction="row" spacing={2}>
                                        <Button sx={{ flex: 1 }} onClick={decrementStep}>Back</Button>
                                        <Button sx={{ flex: 1 }} onClick={incrementStep}>Next</Button>
                                    </Stack>
                                </>

                            )}

                            {step === 3 && (
                                <>
                                    <Typography variant="h6" color="textPrimary" >Extra Instructions</Typography>

                                    <Controller
                                        name="length"
                                        control={control}
                                        render={({ field }) => <Input type="number" label="Length (words)"  {...field}
                                            helperText="
                                        Number of words to generate.
                                    "

                                        />}
                                    />
                                    <Controller
                                        name="paragraphs"
                                        control={control}
                                        render={({ field }) => <Input type="number" label="Paragraphs"  {...field}
                                            helperText="Number of paragraphs to generate."

                                        />}
                                    />
                                    <Stack direction="row" spacing={2}>

                                        <Button sx={{ flex: 1 }} onClick={decrementStep}>Back</Button>
                                        <Button sx={{ flex: 1 }} type="submit">Generate</Button>
                                    </Stack>

                                </>
                            )}



                        </Stack>

                    </form>
                </Stack>
                <Stack flex={5} sx={{ backgroundColor: "#F6F5F4" }}>
                    yo
                </Stack>
            </Stack>

        </CoreLayout>
    )
}

export default CoverLetterPage
