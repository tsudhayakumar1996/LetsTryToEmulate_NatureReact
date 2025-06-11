import AnimatePageLayout from '@/animatePageLayout'
import VertCentContnr from '@/commonComponents/vertCentContnr'
import { TypoProp } from '@/types/common'
import { HeaderOneVarientTypo } from '@/typography'

const VertCntrAlgnTxt = ({ text, sxOverrides }: TypoProp) => {
    return (
        <VertCentContnr>
            <AnimatePageLayout>
                <HeaderOneVarientTypo
                    text={text}
                    sxOverrides={{ ...sxOverrides }}
                />
            </AnimatePageLayout>
        </VertCentContnr>
    )
}

export default VertCntrAlgnTxt
