import { Alert, CircularProgress } from '@mui/material'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import LeftPanel from '../LeftPanel'
import RightPanel from '../RightPanel'
import Button from '../components/Button'
import { useGenerateCoverLetterMutation } from '../services/api'
import { useAuth } from '../hooks/useAuth'
import CoreLayout from '../layouts/CoreLayout'

const Home = () => {
    const [form, setForm] = useState({
        resumeText: '',
        jobListingText: '',
    });

    const { logout } = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
    const [triggerGenerateCoverLetter, { data, isLoading, isError, error }] = useGenerateCoverLetterMutation()

    const onClick = () => {
        triggerGenerateCoverLetter(form)
    }

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

            <Container>
                <Stack direction="row">
                    <LeftPanel handleChange={handleChange} />
                    <RightPanel text={text} />

                    {isLoading && <CircularProgress />}
                    {isError && !!errMsg && <Alert severity="error">{errMsg}</Alert>}
                </Stack>
                <Button onClick={onClick} >Generate Cover Letter</Button>
                <Button onClick={logout} >Logout</Button>

            </Container>
        </CoreLayout>
    )
}

export default Home
