import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import Header from './Header'
import Button from './components/Button'
import { useGenerateCoverLetterMutation } from './services/api'
import { Alert, CircularProgress } from '@mui/material'
import { useState } from 'react'
import GoogleAuth from './components/GoogleAuth'
import { jwtDecode } from 'jwt-decode'

const App = () => {
  const [form, setForm] = useState({
    resumeText: '',
    jobListingText: '',
  });
  const [user, setUser] = useState(null)
  const [authError, setAuthError] = useState<boolean>(false)

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

  const onAuthSuccess = (res: any) => {
    setUser(jwtDecode(res.credential))
  }

  const onAuthError = () => {
    setAuthError(true)
    setTimeout(() => {
      setAuthError(false)

    }, 5000)
  }

  return (
    <Container>
      <GoogleAuth onError={onAuthError} onSuccess={onAuthSuccess} />
      <Header />
      <Stack direction="row">
        <LeftPanel handleChange={handleChange} />
        <RightPanel text={text} />
        <Button onClick={onClick} >Generate Cover Letter</Button>
        {isLoading && <CircularProgress />}
        {isError && !!errMsg && <Alert severity="error">{errMsg}</Alert>}
        {authError && <Alert severity="error">Error logging in</Alert>}
      </Stack>
    </Container>
  )
}

export default App
