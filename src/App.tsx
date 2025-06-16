import { lazy } from 'react'

import '@/App.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { RouterProvider } from 'react-router'

import '@/index.css'
import router from '@/router'

const MuiThemeProvider = lazy(() => import('@/theme/muiThemeProvider'))
const SnkBrPvdr = lazy(() => import('@/snkBrPvdr'))
const QryClntPvdr = lazy(() => import('@/qryClntPvdr'))
// const FcmPvdr = lazy(() => import("@/fcmPvdr"));

function App() {
    return (
        <MuiThemeProvider>
            <QryClntPvdr>
                <SnkBrPvdr />
                {/* <FcmPvdr /> */}
                <GoogleOAuthProvider
                    onScriptLoadError={() =>
                        // eslint-disable-next-line no-console
                        console.log('Google OAuth Loading error occured...')
                    }
                    clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}
                >
                    <RouterProvider router={router} />
                </GoogleOAuthProvider>
            </QryClntPvdr>
        </MuiThemeProvider>
    )
}

export default App
