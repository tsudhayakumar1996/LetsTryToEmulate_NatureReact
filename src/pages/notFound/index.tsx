import AnimatePageLayout from '@/animatePageLayout'
import VertCentContnr from '@/commonComponents/vertCentContnr'
import { PAGE_NOT_FOUND } from '@/const/msg'
import { HeaderOneVarientTypo } from '@/typography'

const NotFound = () => {
    return (
        <AnimatePageLayout>
            <VertCentContnr>
                <HeaderOneVarientTypo text={PAGE_NOT_FOUND} />
            </VertCentContnr>
        </AnimatePageLayout>
    )
}

export default NotFound
