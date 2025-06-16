import AnimatePageLayout from '@/animatePageLayout'
import VertCntrAlgnTxt from '@/commonComponents/vertCntrAlgnTxt'
import { AN_ERROR_OCCURED } from '@/const/msg'
import useGetmapAction from '@/queryClientMethods/useGetmapAction'
import { useQueryMe } from '@/queryClientMethods/useQueryMe'
import useQueryMap from '@/queryClientMethods/useQuerySuggestPlace'
import { Box } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { mappls } from 'mappls-web-maps'
import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router'

const mapplsClassObject = new mappls()

const MapView = () => {
    // map ref
    const map = useRef<any>(null)
    const mapMarkerRef = useRef<any>(null)

    // state
    const [isMapInitDone, setisMapInitDone] = useState(false)

    // hook
    const queryClient = useQueryClient()
    const { mode } = useGetmapAction()

    // query
    const { user } = useQueryMe()
    const { queryMapData, isError, isFetching, error, mrkrClckHndlr, mrkrDrgHndlr } = useQueryMap()

    // effect
    useEffect(() => {
        if (queryMapData && user && !isError && !isFetching) {
            const { lat, lng } = queryMapData.usrCurrLoc
            mapplsClassObject.initialize(import.meta.env.VITE_MAPPLS_KEY, { map: true }, () => {
                if (map.current) {
                    map.current.remove()
                }
                // map
                map.current = mapplsClassObject.Map({
                    id: 'map',
                    properties: {
                        center: [lat, lng],
                        disableDoubleClickZoom: true,
                        zoomControl: false,
                        minZoom: 16,
                        tilt: 120
                    }
                })
                map.current.on('load', () => {
                    setisMapInitDone(true)
                })
                // map.current.addListener('click', function () {})
                map.current.addListener('dragend', function (e: any) {
                    // eslint-disable-next-line no-console
                    console.log(e, 'drag end is here...', e.target.getViewBounds())
                })
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching, isError, user])

    const usrCurrLoc = queryMapData?.usrCurrLoc
    const othrLoc = queryMapData?.remainLoc ?? []

    useEffect(() => {
        if (isMapInitDone && usrCurrLoc) {
            const locations = [
                {
                    lat: Number(usrCurrLoc.lat),
                    lng: Number(usrCurrLoc.lng),
                    img: '/img/plce-hldr.png',
                    currLocation: true,
                    draggable: true,
                    id: '1'
                },
                ...othrLoc
            ]
            // removing exist markers
            const markersRefArr: any[] = []
            if (Array.isArray(mapMarkerRef.current)) {
                mapMarkerRef.current.forEach((m: any) => {
                    m.remove()
                })
            }
            // markers
            locations.forEach(({ lat, lng, img, draggable, currLocation, id }) => {
                const marker = mapplsClassObject.Marker({
                    map: map.current,
                    position: {
                        lat,
                        lng
                    },
                    fitBounds: true,
                    draggable,
                    html: `<div style="positon: relative">
                            <img src="https://apis.mapmyindia.com/map_v3/1.png" alt="pin"/>
                            <div class="bounce-float ${currLocation ? 'user-curr-location' : ''}">
                                <img style="width: 34px; height: 34px;" src=${img} alt="pin" />
                            </div>
                        </div>`
                })
                // marker drag
                marker.addListener('dragend', function (e: any) {
                    const { lat, lng } = e.target.getPosition()
                    mrkrDrgHndlr({ lat, lng, id })
                })
                // marker click
                marker.addListener('click', function () {
                    mrkrClckHndlr({ id })
                })
                markersRefArr.push(marker)
            })
            mapMarkerRef.current = markersRefArr
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMapInitDone, usrCurrLoc, queryClient, mode])

    if (!user) return <></>

    if (isFetching)
        return (
            <VertCntrAlgnTxt
                text={'Getting location...'}
                sxOverrides={{ textAlign: 'center', p: 2 }}
            />
        )

    if (isError)
        return (
            <VertCntrAlgnTxt
                text={error?.message ?? AN_ERROR_OCCURED}
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
