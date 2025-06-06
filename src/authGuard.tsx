import { useEffect } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router'

import VertCentCircPrgs from '@/commonComponents/vertCentCircPrgs'
import { GET_ME_API_END_POINT } from '@/const/apiEndPnts'
import { FOUNT_ANOTHER_SESS_OR_UN_AUTHORIZED, UN_AUTHORIZED } from '@/const/msg'
import { ME } from '@/const/query'
import { AUTH_UI_ROUTES, HOME_UI_ROUTE, LOGIN_UI_ROUTE } from '@/const/uiRoute'
import { getApi } from '@/fetch'
import { ChildrenProp } from '@/types/common'
import { enqueSnackBarError } from '@/utils/helper'

const AuthGuard = ({ children }: ChildrenProp) => {
    // queryclient
    const queryClient = useQueryClient()

    // hook
    const navigate = useNavigate()
    const { pathname } = useLocation()

    // query
    const { data: user } = useQuery({
        queryKey: [ME],
        queryFn: () => null,
        staleTime: Infinity
    })

    // const
    const isUserInLandPage = pathname === '/'

    // query
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return await getApi({ endUrl: GET_ME_API_END_POINT })
        },
        onSuccess: (res) => {
            queryClient.setQueryData([ME], () => res)
        },
        onError: (err) => {
            if (
                JSON.parse(err.message).message === UN_AUTHORIZED ||
                JSON.parse(err.message).message === FOUNT_ANOTHER_SESS_OR_UN_AUTHORIZED
            ) {
                navigate(LOGIN_UI_ROUTE, { replace: true })
                queryClient.setQueryData([ME], () => null)
            }
            enqueSnackBarError(err)
        }
    })

    const checkForMe = !AUTH_UI_ROUTES.includes(pathname) && !user
    const usrInAthPgeAftrLgn = AUTH_UI_ROUTES.includes(pathname) && user

    // effect
    useEffect(() => {
        if (isUserInLandPage) return
        if (usrInAthPgeAftrLgn) navigate(HOME_UI_ROUTE, { replace: true })
        if (checkForMe) {
            mutate()
        }
    }, [navigate, mutate, checkForMe, isUserInLandPage, usrInAthPgeAftrLgn])

    if (isPending) return <VertCentCircPrgs />

    return <>{children}</>
}

export default AuthGuard
