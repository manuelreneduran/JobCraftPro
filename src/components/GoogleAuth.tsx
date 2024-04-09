import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

type GoogleAuthProps = {
    onSuccess: (credentialResponse: CredentialResponse) => void;
    onError: () => void;
}

const GoogleAuth = ({ onSuccess, onError }: GoogleAuthProps) => {

    return (
        <GoogleLogin
            auto_select={true}
            onSuccess={credentialResponse => {
                onSuccess(credentialResponse);
            }}
            onError={() => {
                onError();
            }}
        />
    );
};

export default GoogleAuth;