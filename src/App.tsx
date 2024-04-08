import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import Header from './Header'
import Button from './components/Button'
import { useGenerateCoverLetterMutation } from './services/api'
import { Alert, CircularProgress } from '@mui/material'
import { useState } from 'react'

const App = () => {
  const [form, setForm] = useState({
    resumeText: '',
    jobListingText: '',
  });

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
    <Container>
      <Header />
      <Stack direction="row">
        <LeftPanel handleChange={handleChange} />
        <RightPanel text={text} />
        <Button onClick={onClick} >Generate Cover Letter</Button>
        {isLoading && <CircularProgress />}
        {isError && !!errMsg && <Alert severity="error">{errMsg}</Alert>}
      </Stack>
    </Container>
  )
}

export default App
