import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { TCoverLetterFormInputs } from '../utils/types'
import { Slider, Stack, TextField, Typography } from "@mui/material"
import { yupResolver } from "@hookform/resolvers/yup"
import { coverLetterFormSchema } from "../utils/validation"
import Button from "./Button"

type CoverLetterFormProps = {
    onSubmit: SubmitHandler<TCoverLetterFormInputs>
}

const defaultFormValues: TCoverLetterFormInputs = {
    name: '',
    position: '',
    resume: '',
    jobListing: '',
    length: 200
}
const CoverLetterForm = ({
    onSubmit
}: CoverLetterFormProps) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TCoverLetterFormInputs>({
        defaultValues: defaultFormValues,
        resolver: yupResolver(coverLetterFormSchema)
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} className="form">
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <TextField label="Name" variant="outlined" required {...field} />}
                />
                <Controller
                    name="position"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <TextField label="Position" variant="outlined" required {...field} />}
                />
                <Controller
                    name="resume"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <TextField multiline rows={4} placeholder="Yes, your whole resumé." label="Resume" variant="outlined" required {...field} />}
                />
                <Controller
                    name="jobListing"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <TextField multiline rows={4} label="Job Listing" placeholder="Only the important bits." variant="outlined" required {...field} />}
                />
                <Typography id="input-slider" gutterBottom>
                    Length (words)
                </Typography>
                <Controller
                    name="length"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Slider
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        step={25}
                        marks
                        min={100}
                        max={300}
                        {...field}
                    />}
                />

            </Stack>

            <Button type="submit">Submit</Button>
        </form>

    )
}

export default CoverLetterForm