import { MAP_ACTION } from '@/const/query'
import { getCurrentLocation } from '@/helper/getLocation'
import { LocationType } from '@/types/common'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useGetmapAction from './useGetmapAction'

type IdType = {
    id: string
}

type Click = 'click'
type Drag = 'drag'

type ActionProp = Click | Drag | ''

type UseQueryProp = {
    usrCurrLoc: LocationType
    actnDneOnMrkrState: {
        mode: string
        showModal: boolean
        id: string
        action: ActionProp
        renderId: number
    }
    remainLoc: any[]
    mapState: {
        bounds: string
    }
}

const useQueryMap = () => {
    // hook
    const { mode } = useGetmapAction()
    const queryClient = useQueryClient()

    // query
    const {
        data: queryMapData,
        isError,
        error,
        isFetching
    } = useQuery<UseQueryProp>({
        queryKey: [MAP_ACTION],
        queryFn: async () => {
            // const lat = 8.11357
            // const lng = 77.403957
            const showModal = false
            const id = ''
            const action = ''
            const renderId = Math.random()
            const { lat, lng } = await getCurrentLocation()
            return {
                usrCurrLoc: { lat, lng },
                actnDneOnMrkrState: { mode, showModal, id, action, renderId },
                remainLoc: [],
                mapState: {
                    bounds: ''
                }
            }
        },
        staleTime: Infinity
    })

    // hlpr
    const mrkrDrgHndlr = ({ lat, lng, id }: LocationType & IdType) => {
        queryClient.setQueryData([MAP_ACTION], () => ({
            ...queryMapData,
            usrCurrLoc: {
                lat,
                lng
            },
            actnDneOnMrkrState: {
                ...queryMapData?.actnDneOnMrkrState,
                id,
                action: 'drag',
                renderId: Math.random()
            }
        }))
    }

    const mrkrClckHndlr = ({ id }: IdType) => {
        queryClient.setQueryData([MAP_ACTION], () => ({
            ...queryMapData,
            actnDneOnMrkrState: {
                ...queryMapData?.actnDneOnMrkrState,
                showModal: true,
                id,
                action: 'click',
                renderId: Math.random()
            }
        }))
    }

    return { queryMapData, isError, error, isFetching, mrkrClckHndlr, mrkrDrgHndlr }
}

export default useQueryMap
