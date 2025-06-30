import { ME } from '@/const/query'
import { useQuery } from '@tanstack/react-query'

type UserProp = {
    user: string
    name: string
    picture: string
}

export const useQueryMe = () => {
    // query
    const { data: user } = useQuery<UserProp | null>({
        queryKey: [ME],
        queryFn: () => null,
        staleTime: Infinity
    })

    return { user }
}
