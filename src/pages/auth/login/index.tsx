import AnimatePageLayout from '@/animatePageLayout'
import { GET_ME_API_END_POINT, GOOGLE_AUTH_LOGIN } from '@/const/apiEndPnts'
import { ME } from '@/const/query'
import { getApi, postApi } from '@/fetch'
import { UserProp } from '@/types/common'
import { enqueSnackBarError } from '@/utils/helper'
import { Button } from '@mui/material'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Login = () => {
    // query
    const queryClient = useQueryClient()
    const { mutateAsync } = useMutation({
        mutationFn: (code: string) => postApi({ endUrl: GOOGLE_AUTH_LOGIN, reqObj: { code } }),
        onSuccess: (res: UserProp) => {
            queryClient.setQueryData([ME], () => res)
        },
        onError: () => alert('An error occured...')
    })

    // handler

    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: (token) => {
            mutateAsync(token.code)
        },
        onError: (err) => enqueSnackBarError(new Error(err.error))
    })

    const fbLogin = () => {
        const windowLoc: any = window
        windowLoc.FB.login(function (res: any) {
            // eslint-disable-next-line no-console
            console.log(res, 'fb response is here to check...')
        })
    }

    return (
        <AnimatePageLayout>
            <Button
                variant="outlined"
                onClick={() => fbLogin()}
            >
                Login
            </Button>
            <Button
                variant="outlined"
                onClick={googleLogin}
            >
                Login Google
            </Button>
            <Button
                variant="outlined"
                onClick={googleLogout}
            >
                Logout
            </Button>
            <Button
                variant="outlined"
                onClick={async () => {
                    await getApi({ endUrl: GET_ME_API_END_POINT })
                }}
            >
                api check
            </Button>
            <div
                className="fb-login-button"
                data-width=""
                data-size=""
                data-button-type=""
                data-layout=""
                data-auto-logout-link="false"
                data-use-continue-as="false"
            >
                <Button
                    variant="outlined"
                    onClick={() => {}}
                >
                    Login FB
                </Button>
            </div>
        </AnimatePageLayout>
    )
}

export default Login
