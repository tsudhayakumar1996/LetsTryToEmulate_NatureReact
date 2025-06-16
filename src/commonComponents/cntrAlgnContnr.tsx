import { Box } from '@mui/material'

import { ChildrenProp } from '@/types/common'

const CenterContnr = ({ children }: ChildrenProp) => {
    return <Box textAlign="center">{children}</Box>
}

export default CenterContnr
