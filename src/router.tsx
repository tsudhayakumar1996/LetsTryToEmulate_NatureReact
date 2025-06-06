import { lazy } from 'react'

import { createBrowserRouter } from 'react-router'

import {
    AUTH_UI_ROUTE,
    CARING_ROUTE,
    HOME_UI_ROUTE,
    LOGIN_UI_ROUTE,
    SUGGEST_PLACE_ROUTE,
    SUPPORT_ROUTE
} from '@/const/uiRoute'
import Error from '@/pages/error'
import NotFound from '@/pages/notFound'
import { resolvePromiseWithDelay } from '@/utils/helper'

const Home = lazy(() => resolvePromiseWithDelay(import('@/pages/home'), 1000))
const Login = lazy(() => resolvePromiseWithDelay(import('@/pages/auth/login'), 1000))
const RootLayout = lazy(() => import('@/rootLayout'))
const AthFrmsContnr = lazy(() => import('@/pages/auth/components/athFrmsContnr'))
const SuggestPlace = lazy(() => import('@/pages/suggestPlace'))
const SupportPage = lazy(() => import('@/pages/supportPage'))
const CaryingPage = lazy(() => import('@/pages/caryingPage'))

const router = createBrowserRouter([
    {
        path: HOME_UI_ROUTE,
        Component: RootLayout,
        errorElement: <Error />,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: AUTH_UI_ROUTE,
                Component: AthFrmsContnr,
                children: [
                    {
                        path: LOGIN_UI_ROUTE,
                        Component: Login
                    }
                ]
            },
            {
                path: SUGGEST_PLACE_ROUTE,
                Component: SuggestPlace
            },
            {
                path: CARING_ROUTE,
                Component: CaryingPage
            },
            {
                path: SUPPORT_ROUTE,
                Component: SupportPage
            },
            {
                path: '*',
                Component: NotFound
            }
        ]
    }
])

export default router
