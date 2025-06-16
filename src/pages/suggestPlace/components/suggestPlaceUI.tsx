import CmnIcnBtn from '@/commonComponents/cmnIcnBtn'
import CmnModal from '@/commonComponents/cmnModal'
import CmrComp from '@/commonComponents/cmrComp'
import useQueryMap from '@/queryClientMethods/useQuerySuggestPlace'
import { useEffect, useState } from 'react'

const SuggestPlaceUI = () => {
    // state
    const [showCam, setshowCam] = useState(false)
    const [photo, setphoto] = useState<Base64URLString>()

    // qry
    const { queryMapData } = useQueryMap()
    const renderId = queryMapData?.actnDneOnMrkrState.renderId
    const usrAction = queryMapData?.actnDneOnMrkrState?.action

    // effect
    useEffect(() => {
        if (renderId && usrAction === 'click') {
            setshowCam(true)
        }
    }, [renderId, usrAction])

    // eslint-disable-next-line no-console
    console.log(photo, 'photo is here')

    return (
        <>
            <CmnIcnBtn
                sx={{
                    position: 'absolute',
                    bottom: 245,
                    right: 20
                }}
                onClick={() => setshowCam((prev) => !prev)}
            >
                📷
            </CmnIcnBtn>
            {/* cam modal */}
            <CmnModal
                open={showCam}
                onClose={() => setshowCam(false)}
            >
                <CmrComp
                    setphoto={setphoto}
                    onClose={() => setshowCam(false)}
                />
            </CmnModal>
        </>
    )
}

export default SuggestPlaceUI
