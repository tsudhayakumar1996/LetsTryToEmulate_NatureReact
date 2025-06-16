import { Box } from '@mui/material'
import { Outlet } from 'react-router'

import CenterContnr from '@/commonComponents/cntrAlgnContnr'
import VertCentContnr from '@/commonComponents/vertCentContnr'
import WhteBgWthPosndImgContnr from '@/commonComponents/whteBgWthPosndImgContnr'

const AthFrmsContnr = () => {
    return (
        <VertCentContnr>
            <Box sx={{ width: { xs: '100%', sm: '400px' }, m: 2 }}>
                <WhteBgWthPosndImgContnr>
                    <CenterContnr>
                        <Outlet />
                    </CenterContnr>
                </WhteBgWthPosndImgContnr>
            </Box>
        </VertCentContnr>
    )
}

export default AthFrmsContnr
