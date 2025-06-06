import { useRef } from 'react'

import { Box, Button } from '@mui/material'
import { motion, useScroll, useTransform } from 'motion/react'

import { LOGOUT_API_END_POINT } from '@/const/apiEndPnts'
import { ME } from '@/const/query'
import { LOGIN_UI_ROUTE } from '@/const/uiRoute'
import { postApi } from '@/fetch'
import TxtWthBtn from '@/pages/home/components/txtWthBtn'
import { CJProps, contentJson } from '@/pages/home/const/contentJson'
import { ChildrenProp } from '@/types/common'
import { enqueSnackBarError } from '@/utils/helper'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

const ParrlxContnt = () => {
    // ref
    const itemsRef: any = useRef([])
    // hook
    const navigate = useNavigate()

    // query
    const queryClient = useQueryClient()

    const scrollHandler = (cJ: CJProps) => {
        if (cJ.actionFor === 'redirect') {
            navigate(cJ.redirectURL)
        } else if (cJ.actionFor === 'scroll') {
            itemsRef.current[cJ.scrollIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }

    const logoutHndlr = async () => {
        try {
            await postApi({ endUrl: LOGOUT_API_END_POINT, reqObj: {} })
            queryClient.setQueryData([ME], () => null)
            navigate(LOGIN_UI_ROUTE)
        } catch (error) {
            enqueSnackBarError(error as Error)
        }
    }

    return (
        <>
            <Button onClick={logoutHndlr}>Logout</Button>
            {contentJson.map((cJ, idx) => (
                <TxtImgParrlxContnt
                    key={idx}
                    height="85vh"
                    img={cJ.img}
                    subHead={cJ.subHead}
                    head={cJ.head}
                    ref={(el: never) => (itemsRef.current[idx] = el)}
                >
                    <TxtWthBtn
                        actionHead={cJ.actionHead}
                        actionBtnLabel={cJ.actionBtnLabel}
                        typeWrtrCntnt={cJ.typeWrtrCntnt}
                        scrollHandler={() => scrollHandler(cJ)}
                    />
                </TxtImgParrlxContnt>
            ))}
        </>
    )
}

const TxtImgParrlxContnt = ({
    img,
    subHead,
    head,
    children,
    height,
    ref
}: {
    img: string
    subHead: string
    head: string
    height: string
    ref: any
} & ChildrenProp) => {
    return (
        <Box
            sx={{ position: 'relative', minHeight: height }}
            ref={ref}
        >
            <StickyImage img={img}>{children}</StickyImage>
            <OverlayTxt
                head={head}
                subHead={subHead}
            />
        </Box>
    )
}

const OverlayTxt = ({ head, subHead }: { head: string; subHead: string }) => {
    // hook
    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start end', 'end start']
    })
    const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [0, 1, -1.5])

    return (
        <Box
            ref={targetRef}
            component={motion.div}
            style={{
                opacity
            }}
            sx={{
                position: 'absolute',
                top: 0,
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                width: { xs: '100%', md: '50%' },
                zIndex: 1
            }}
        >
            <p style={{ margin: 0, textAlign: 'center' }}>{subHead}</p>
            <h1 style={{ textAlign: 'center' }}>{head}</h1>
        </Box>
    )
}

const StickyImage = ({ img, children }: { img: string } & ChildrenProp) => {
    // hook
    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end start']
    })
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
    const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1.1])
    const invertOpac = useTransform(scrollYProgress, [1, 0], [-4, 1])
    const borderRadius = '0px 0px 32px 0px'

    return (
        <>
            <Box
                ref={targetRef}
                component={motion.div}
                sx={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '400px',
                    width: { xs: '100%', md: '50%' },
                    top: 0,
                    position: 'sticky',
                    zIndex: 1,
                    borderRadius
                }}
                style={{ scale }}
            >
                <Box
                    component={motion.div}
                    sx={{
                        position: 'absolute',
                        borderRadius,
                        backgroundColor: 'black',
                        inset: 0
                    }}
                    style={{ opacity }}
                />
            </Box>
            <Box
                component={motion.div}
                style={{ opacity: invertOpac }}
            >
                {children}
            </Box>
        </>
    )
}

export default ParrlxContnt
