import AnimatePageLayout from '@/animatePageLayout'
import VertCentContnr from '@/commonComponents/vertCentContnr'
import { AN_ERROR_OCCURED } from '@/const/msg'
import { HeaderOneVarientTypo } from '@/typography'

const Error = () => {
    return (
        <AnimatePageLayout>
            <VertCentContnr>
                <HeaderOneVarientTypo text={AN_ERROR_OCCURED} />
            </VertCentContnr>
        </AnimatePageLayout>
    )
}

export default Error
