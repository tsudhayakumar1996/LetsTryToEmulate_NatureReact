import { ME } from '@/const/query'
import { useQuery } from '@tanstack/react-query'

export const useQueryMe = () => {
    // query
    const { data: user } = useQuery({
        queryKey: [ME],
        queryFn: () => null,
        staleTime: Infinity
    })

    return { user }
}
