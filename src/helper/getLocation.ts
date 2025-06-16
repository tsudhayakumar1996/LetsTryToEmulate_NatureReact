import {
    AN_ERROR_OCCURED,
    GEO_LOCATION_NOT_SUPPORTED,
    LOCATION_GET_TIMEOUT,
    LOCATION_UNAVAILABLE,
    PERMISSION_LOCATION_DENIED
} from '@/const/msg'
import { LocationType } from '@/types/common'

export const getCurrentLocation = (): Promise<LocationType> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error(GEO_LOCATION_NOT_SUPPORTED))
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                resolve({ lat, lng })
            },
            (err: GeolocationPositionError) => {
                const errMsg =
                    err.code === 1
                        ? PERMISSION_LOCATION_DENIED
                        : err.code === 2
                          ? LOCATION_UNAVAILABLE
                          : err.code === 3
                            ? LOCATION_GET_TIMEOUT
                            : AN_ERROR_OCCURED
                reject(new Error(errMsg))
            },
            { enableHighAccuracy: true }
        )
    })
}
