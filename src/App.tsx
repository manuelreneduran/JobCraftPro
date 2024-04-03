import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import Header from './Header'
const App = () => {

  return (
    <Container>
      <Header />
      <Stack direction="row">
        <LeftPanel />
        <RightPanel />
      </Stack>
    </Container>
  )
}

export default App
