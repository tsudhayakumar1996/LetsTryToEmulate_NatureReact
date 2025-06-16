import {
    AN_ERROR_OCCURED,
    GEO_LOCATION_NOT_SUPPORTED,
    LOCATION_GET_TIMEOUT,
    LOCATION_UNAVAILABLE,
    PERMISSION_LOCATION_DENIED
} from '@/const/msg'
import { LocationType } from '@/types/common'
import { useEffect, useState } from 'react'

const useGetLocationHook = () => {
    // state
    const [location, setlocation] = useState<LocationType>()
    const [loadingOrError, setloadingOrError] = useState({
        loading: false,
        error: false,
        errorMsg: ''
    })

    // effect
    useEffect(() => {
        if (navigator.geolocation) {
            try {
                setloadingOrError({ loading: true, error: false, errorMsg: '' })
                navigator.geolocation.getCurrentPosition(success, error, {
                    enableHighAccuracy: true
                })
            } catch (err) {
                error(err as GeolocationPositionError)
            }
        } else {
            setloadingOrError({
                loading: false,
                error: true,
                errorMsg: GEO_LOCATION_NOT_SUPPORTED
            })
        }
    }, [])

    // handler
    const success = (position: GeolocationPosition) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        setlocation({ lat, lng })
        setloadingOrError({ loading: false, error: false, errorMsg: '' })
    }

    const error = (err: GeolocationPositionError) => {
        const errMsg =
            err.code === 1
                ? PERMISSION_LOCATION_DENIED
                : err.code === 2
                  ? LOCATION_UNAVAILABLE
                  : err.code === 3
                    ? LOCATION_GET_TIMEOUT
                    : AN_ERROR_OCCURED
        setloadingOrError({
            loading: false,
            error: true,
            errorMsg: errMsg
        })
    }

    return { ...location, ...loadingOrError }
}

export default useGetLocationHook
