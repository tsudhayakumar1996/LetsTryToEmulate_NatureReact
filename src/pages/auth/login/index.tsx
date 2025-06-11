import AnimatePageLayout from '@/animatePageLayout'
import { GET_ME_API_END_POINT, GOOGLE_AUTH_LOGIN } from '@/const/apiEndPnts'
import { ME } from '@/const/query'
import { getApi, postApi } from '@/fetch'
import { UserProp } from '@/types/common'
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
        }
    })
    return (
        <AnimatePageLayout>
            <Button
                variant="outlined"
                onClick={() => googleLogin()}
            >
                Login
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
        </AnimatePageLayout>
    )
}

export default Login
