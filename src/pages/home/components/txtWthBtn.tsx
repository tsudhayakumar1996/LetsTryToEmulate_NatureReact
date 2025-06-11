import CmnButton from '@/commonComponents/cmnButton'
import { HeaderOneVarientTypo, PVarientTypo } from '@/typography'
import { Grid } from '@mui/material'

const TxtWthBtn = ({
    actionHead,
    actionBtnLabel,
    typeWrtrCntnt,
    scrollHandler
}: {
    actionHead: string
    actionBtnLabel: string
    typeWrtrCntnt: string
    scrollHandler: () => void
}) => {
    return (
        <Grid
            container
            sx={{ zIndex: 0 }}
            spacing={6}
            px={2}
            py={6}
        >
            <Grid
                size={{ xs: 12, md: 6 }}
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <HeaderOneVarientTypo text={actionHead} />
                <CmnButton
                    disabled={false}
                    sx={{ mb: 2 }}
                    title={actionBtnLabel}
                    type="button"
                    variant="outlined"
                    onClick={() => scrollHandler()}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <PVarientTypo
                    text={typeWrtrCntnt}
                    sxOverrides={{ m: 0, textAlign: 'center' }}
                />
            </Grid>
        </Grid>
    )
}

export default TxtWthBtn
