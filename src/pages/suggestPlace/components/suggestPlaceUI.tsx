import CmnModal from '@/commonComponents/cmnModal'
import TkeImgComp from '@/commonComponents/tkeImgComp'
import { FILE_UPLOAD } from '@/const/apiEndPnts'
import { filePostApi } from '@/fetch'
import useQueryMap from '@/queryClientMethods/useQuerySuggestPlace'
import { useEffect, useState } from 'react'

const SuggestPlaceUI = () => {
    // state
    const [showCam, setshowCam] = useState(false)
    const [photo, setphoto] = useState<File | undefined>(undefined)

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

    // hndlr
    const imgUpldHndlr = () => {
        if (photo) {
            // eslint-disable-next-line no-console
            console.log(photo, 'photot is here....')
            filePostApi({
                endUrl: FILE_UPLOAD,
                file: photo
            })
        }
    }

    const suggestPlceAction = () => {
        imgUpldHndlr()
    }

    return (
        <>
            {/* cam modal */}
            <CmnModal
                open={showCam}
                onClose={() => setshowCam(false)}
            >
                <TkeImgComp
                    onClose={() => setshowCam(false)}
                    setphoto={setphoto}
                    photo={photo}
                    suggestPlceAction={suggestPlceAction}
                />
            </CmnModal>
        </>
    )
}

export default SuggestPlaceUI
