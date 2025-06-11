import AnimatePageLayout from '@/animatePageLayout'
// import VertCntrAlgnTxt from '@/commonComponents/vertCntrAlgnTxt'
import { ME } from '@/const/query'
// import useGetLocationHook from '@/hooks/useGetLocationHook'
import useGetLocationHook from '@/hooks/useGetLocationHook'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { mappls } from 'mappls-web-maps'
import { useEffect, useRef } from 'react'
import { Outlet } from 'react-router'
import VertCntrAlgnTxt from './vertCntrAlgnTxt'

const mapplsClassObject = new mappls()

const MapView = () => {
    // map ref
    const map = useRef<any>(null)
    const mapMarker = useRef<any>(null)

    // hook
    const { loading, lat, lng, error, errorMsg } = useGetLocationHook()
    // const lat = 8.11357
    // const lng = 77.403957

    // query
    const { data: user } = useQuery({
        queryKey: [ME],
        queryFn: () => null,
        staleTime: Infinity
    })

    // const geoData = useMemo(
    //     () => ({
    //         type: 'FeatureCollection',
    //         features: [
    //             {
    //                 type: 'Feature',
    //                 properties: {
    //                     icon: '/img/user-location-icon.png',
    //                     'icon-size': 0.08
    //                 },
    //                 geometry: {
    //                     type: 'Point',
    //                     coordinates: [lat, lng]
    //                 }
    //             }
    //         ]
    //     }),
    //     [lat, lng]
    // )

    // effect
    useEffect(() => {
        if (lat && lng) {
            mapplsClassObject.initialize(import.meta.env.VITE_MAPPLS_KEY, { map: true }, () => {
                if (map.current) {
                    map.current.remove()
                }
                // map
                map.current = mapplsClassObject.Map({
                    id: 'map',
                    properties: {
                        center: [lat, lng],
                        icon: '/img/user-location-icon.png',
                        disableDoubleClickZoom: true,
                        zoomControl: false,
                        minZoom: 16,
                        tilt: 120
                    }
                })
                // mapplsClassObject.addGeoJson({
                //     map: map.current,
                //     data: geoData
                // })
                map.current.on('load', (data: any) => {
                    // eslint-disable-next-line no-console
                    console.log(data, 'data is here to check...')
                })
                map.current.addListener('click', function () {})
                map.current.addListener('dragend', function (e: any) {
                    // eslint-disable-next-line no-console
                    console.log(e, 'drag end is here...', e.target.getViewBounds())
                })

                // marker
                mapMarker.current = mapplsClassObject.Marker({
                    map: map.current,
                    position: { lat, lng },
                    fitBounds: true,
                    draggable: true
                })

                mapMarker.current.addListener('dragend', function (e: any) {
                    alert(JSON.stringify(e.target.getPosition()))
                })
            })
        }
    }, [lat, lng])

    if (!user) return <></>

    if (loading)
        return (
            <VertCntrAlgnTxt
                text={'Getting location...'}
                sxOverrides={{ textAlign: 'center', p: 2 }}
            />
        )

    if (error)
        return (
            <VertCntrAlgnTxt
                text={errorMsg}
                sxOverrides={{ textAlign: 'center', p: 2 }}
            />
        )

    return (
        <Box>
            <div
                id="map"
                style={{ width: '100%', height: '100vh' }}
            />
            <AnimatePageLayout>
                <Outlet />
            </AnimatePageLayout>
        </Box>
    )
}

export default MapView
