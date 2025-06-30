import AnimatePageLayout from '@/animatePageLayout'
import type { ModalProps } from '@mui/material'
import { Backdrop, Box, Fade, Modal } from '@mui/material'

const CmnModal = ({ children, open, ...props }: ModalProps) => {
    // const
    const style = {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '80%', lg: '40%' },
        maxHeight: '80%',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        borderRadius: '10px',
        boxShadow: 24,
        p: { xs: 1, md: 4 }
    }

    return (
        <Modal
            open={open}
            disableAutoFocus
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500
                }
            }}
            {...props}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <AnimatePageLayout>{children}</AnimatePageLayout>
                </Box>
            </Fade>
        </Modal>
    )
}

export default CmnModal
