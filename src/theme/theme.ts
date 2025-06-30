import { purple } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
            light: '#37B58B',
            dark: '#01736C'
        },
        secondary: {
            main: purple[500]
        },
        success: {
            main: '#01736C'
        }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'url(/img/paper-blur.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        borderRadius: '1rem'
                    }
                }
            }
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(8px)'
                }
            }
        }
    },
    typography: {
        fontFamily: 'special-elite',
        h1: {
            fontSize: '5rem'
        },
        h2: {
            fontSize: '4rem'
        },
        h3: {
            fontSize: '3rem'
        }
    }
})

export default theme
