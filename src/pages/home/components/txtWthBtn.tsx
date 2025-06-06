import CmnButton from '@/commonComponents/cmnButton'
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
    // hook
    // const navigate = useNavigate()
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
                <h1>{actionHead}</h1>
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
                {/* <TypeWritter text={typeWrtrCntnt} /> */}
                <p style={{ margin: 0, textAlign: 'center' }}>{typeWrtrCntnt}</p>
            </Grid>
        </Grid>
    )
}

export default TxtWthBtn
