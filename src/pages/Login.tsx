import { Container } from "@mui/material";
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import GoogleAuth from "../components/GoogleAuth";

const Login = () => {
    const [user, setUser] = useState(null)
    const [authError, setAuthError] = useState<boolean>(false)

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
        </Container>
    )
}

export default Login;