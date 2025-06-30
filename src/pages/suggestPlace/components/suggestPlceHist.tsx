import CmnIcnBtn from '@/commonComponents/cmnIcnBtn'
import CmnSwpeDrawr from '@/commonComponents/cmnSwpeDrawr'
import { ERROR_VARIANT_MODAL } from '@/const/infoModalConsts'
import useInfoToUserViewMethods from '@/queryClientMethods/useInfoToUserViewMethods'
import { Box } from '@mui/material'
import { useState } from 'react'
import { SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'

const TrailingActionComp = ({ setshow }: { setshow: (val: boolean) => void }) => {
    // hook
    const { infoOpenHandler } = useInfoToUserViewMethods()

    return (
        <TrailingActions>
            <Box
                component={SwipeAction}
                // destructive={true}
                sx={{ backgroundColor: 'red' }}
                onClick={() => {
                    setshow(false)
                    infoOpenHandler({ variant: ERROR_VARIANT_MODAL, msg: 'Are u sure want to delete this location' })
                }}
            >
                Delete
            </Box>
        </TrailingActions>
    )
}

const SuggestPlceHist = () => {
    // state
    const [show, setshow] = useState(false)
    return (
        <>
            <CmnIcnBtn
                sx={{
                    position: 'absolute',
                    bottom: 250,
                    right: 20
                }}
                onClick={() => setshow(true)}
            >
                🏴‍☠️
            </CmnIcnBtn>
            {/* drawer ui */}
            <CmnSwpeDrawr
                setshow={setshow}
                show={show}
            >
                <Box component={SwipeableList}>
                    <Box
                        component={SwipeableListItem}
                        trailingActions={<TrailingActionComp setshow={setshow} />}
                        maxSwipe={0}
                        sx={{ py: 2, backgroundColor: 'grey' }}
                    >
                        Item content
                    </Box>
                </Box>
            </CmnSwpeDrawr>
        </>
    )
}

export default SuggestPlceHist
