import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import InfoToUserView from '@/commonComponents/infoToUserView'
import { ChildrenProp } from '@/types/common'

const QryClntPvdr = ({ children }: ChildrenProp) => {
    // client
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools
                initialIsOpen={false}
                buttonPosition="top-left"
            />
            <InfoToUserView>{children}</InfoToUserView>
        </QueryClientProvider>
    )
}

export default QryClntPvdr
