import type { IconButtonProps, Theme } from '@mui/material'
import { IconButton } from '@mui/material'

import { motion } from 'motion/react'

const CmnIcnBtn = ({ ...props }: IconButtonProps) => {
    return (
        <IconButton
            component={motion.button}
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            {...props}
            sx={{
                width: '48px',
                height: '48px',
                backgroundColor: (theme: Theme) => theme.palette.common.white,
                color: 'inherit',
                borderRadius: '50%',
                ':hover': {
                    backgroundColor: (theme: Theme) => theme.palette.common.white
                },
                ...props.sx
            }}
        >
            {props.children}
        </IconButton>
    )
}

export default CmnIcnBtn
