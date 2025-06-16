import { SUGGEST_PLACE_ROUTE } from '@/const/uiRoute'
import { useLocation } from 'react-router'

export const SUGGEST = 'suggest'
export const STATUS = 'status'
export type MAP_MODES = typeof SUGGEST | typeof STATUS

const useGetmapAction = () => {
    const { pathname } = useLocation()
    const mode = pathname === SUGGEST_PLACE_ROUTE ? SUGGEST : STATUS
    return { mode }
}

export default useGetmapAction
