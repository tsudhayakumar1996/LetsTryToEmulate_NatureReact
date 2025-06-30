import { ChildrenProp } from '@/types/common'
import { Box, styled, SwipeableDrawer } from '@mui/material'
import { grey } from '@mui/material/colors'

const drawerBleeding = 56

const Puller = styled('div')(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: grey[300],
    borderRadius: 3,
    margin: '16px 0px',
    ...theme.applyStyles('dark', {
        backgroundColor: grey[900]
    })
}))

const CmnSwpeDrawr = ({
    children,
    show,
    setshow
}: ChildrenProp & { show: boolean; setshow: (val: boolean) => void }) => {
    return (
        <SwipeableDrawer
            anchor="bottom"
            open={show}
            onClose={() => setshow(false)}
            onOpen={() => setshow(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            slotProps={{
                paper: {
                    sx: {
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16
                    }
                }
            }}
        >
            <Box
                sx={{
                    backgroundColor: (theme) => theme.palette.common.white,
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Puller />
            </Box>
            <Box sx={{ height: '75vh', overflowY: 'auto' }}>{children}</Box>
        </SwipeableDrawer>
    )
}

export default CmnSwpeDrawr
