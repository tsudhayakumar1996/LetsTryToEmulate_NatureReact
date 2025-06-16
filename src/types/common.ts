import { ReactNode } from 'react'

import type { SxProps } from '@mui/material'

export type ChildrenProp = { children: ReactNode }
export type UserProp = { email: string; name: string }
export type TypoTilteProp = { text: string }
export type SXProps = { sx: SxProps }
export type SXOptionalProps = { sx?: SxProps }
export type EndUrlProp = { endUrl: string }
export type APIReqProp = { reqObj: Record<string, any> }
export type ToProp = { to: string }

export type LocationType = {
    lat: LocationEntityProp
    lng: LocationEntityProp
}

type LocationEntityProp = number

export type TypoProp = {
    text: string
    sxOverrides?: SxProps
}
