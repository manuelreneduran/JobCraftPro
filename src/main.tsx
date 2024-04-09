import { ThemeProvider } from '@emotion/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import Home from './pages//Home.tsx'
import './index.css'
import { store } from './store'
import theme from './theme.tsx'
import { BrowserRouter } from "react-router-dom";
import Login from './pages/Login.tsx'
import { AuthProvider } from './hooks/useAuth.tsx'
import App from './App.tsx'

const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID;



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>

  </React.StrictMode>,
)
