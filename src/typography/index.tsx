import { TypoProp } from '@/types/common'
import { Typography } from '@mui/material'

export const HeaderOneVarientTypo = ({ text, sxOverrides }: TypoProp) => {
    return (
        <Typography
            variant="h1"
            sx={{ ...sxOverrides, fontSize: '2rem', fontWeight: 'bold' }}
        >
            {text}
        </Typography>
    )
}

export const PVarientTypo = ({ text, sxOverrides }: TypoProp) => {
    return (
        <Typography
            variant="body1"
            sx={{ ...sxOverrides, fontSize: '1rem' }}
        >
            {text}
        </Typography>
    )
}
