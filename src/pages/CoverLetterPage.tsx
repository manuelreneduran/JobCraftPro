import { Alert, CircularProgress, TextField, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { SubmitHandler } from "react-hook-form"
import CoverLetterForm from '../components/CoverLetterForm'
import Panel from '../components/Panel'
import CoreLayout from '../layouts/CoreLayout'
import { useGenerateCoverLetterMutation } from '../services/api'
import { TCoverLetterFormInputs } from '../utils/types'

const CoverLetterPage = () => {
    const [edit, setEdit] = useState<boolean>(false)

    const [triggerGenerateCoverLetter, { data, isLoading, isError, error }] = useGenerateCoverLetterMutation()

    const onSubmit: SubmitHandler<TCoverLetterFormInputs> = (data) => triggerGenerateCoverLetter(data)

    const text = data?.result
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


    return (
        <CoreLayout>
            <Stack direction="row" height="100%" flex={1} className="panel-wrapper">
                <Panel>
                    <Stack className="form-wrapper" spacing={2} height="100%" padding='1rem' boxSizing="border-box" sx={{
                        overflowY: 'auto',
                    }}>
                        <Typography variant="h5" color="textPrimary" >Details</Typography>
                        <CoverLetterForm onSubmit={onSubmit} />
                    </Stack>
                </Panel>
                <Panel >
                    <Stack className="generated-cover-letter-wrapper" spacing={2} height="100%" padding='1rem' boxSizing="border-box" sx={{
                        overflowY: 'auto',
                    }}>
                        <Typography variant="h5" color="textPrimary">Cover Letter</Typography>
                    </Stack>
                </Panel>
                {
                    edit ? <TextField fullWidth multiline rows={10} label="Cover Letter" variant="outlined" value={text} /> :
                        <Typography>{text}</Typography>
                }


                {isLoading && <CircularProgress />}
                {isError && !!errMsg && <Alert severity="error">{errMsg}</Alert>}
            </Stack>

        </CoreLayout>
    )
}

export default CoverLetterPage
