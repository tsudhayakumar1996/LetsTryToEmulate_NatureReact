import { ERROR_VARIANT_MODAL, INFO_VARIANT_MODAL, SUCCESS_VARIANT_MODAL } from '@/const/infoModalConsts'
import { INFO_MODAL_QUERY } from '@/const/query'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export type InfoVariant = typeof INFO_VARIANT_MODAL | typeof SUCCESS_VARIANT_MODAL | typeof ERROR_VARIANT_MODAL
export type InfoModalType = {
    show: boolean
    variant: InfoVariant
    msg: string
}

const useInfoToUserViewMethods = () => {
    // query
    const queryClient = useQueryClient()
    const { data: infoModalState } = useQuery<InfoModalType>({
        queryKey: [INFO_MODAL_QUERY],
        queryFn: () => ({
            show: false,
            variant: INFO_VARIANT_MODAL,
            msg: ''
        }),
        staleTime: Infinity
    })

    // handler
    const infoOpenHandler = ({ variant, msg }: { variant: InfoVariant; msg: string }) => {
        queryClient.setQueryData([INFO_MODAL_QUERY], () => ({
            show: true,
            variant,
            msg
        }))
    }

    const infoCloseHandler = () => {
        queryClient.setQueryData([INFO_MODAL_QUERY], () => ({
            ...infoModalState,
            show: false
        }))
    }

    return { infoOpenHandler, infoCloseHandler, infoModalState }
}

export default useInfoToUserViewMethods
