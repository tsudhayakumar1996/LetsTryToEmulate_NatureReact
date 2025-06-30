import CmnButton from '@/commonComponents/cmnButton'
import CmnIcnBtn from '@/commonComponents/cmnIcnBtn'
import ImgFrm from '@/commonComponents/imgFrm'
import { useQueryMe } from '@/queryClientMethods/useQueryMe'
import { enqueSnackBarError } from '@/utils/helper'
import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

export type ImgMode = 'live' | 'local'

const TkeImgComp = ({
    onClose,
    setphoto,
    photo,
    suggestPlceAction
}: {
    onClose: () => void
    setphoto: (photo?: File) => void
    photo?: File
    suggestPlceAction: () => void
}) => {
    // ref
    const videoRef = useRef<any>(null)
    const canvasRef = useRef<any>(null)

    // hook
    const { user } = useQueryMe()

    // state
    const [photoMode, setphotoMode] = useState<ImgMode>('local')
    const [previewImg, setpreviewImg] = useState<string | ArrayBuffer | undefined>(undefined)

    // effect
    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: { ideal: 'environment' },
                        aspectRatio: 16 / 9
                    },
                    audio: false
                })

                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                }
            } catch (err) {
                enqueSnackBarError(err as Error)
            }
        }

        startCamera()

        const videoRefCurr = videoRef.current
        return () => {
            if (videoRefCurr && videoRefCurr?.srcObject) {
                const stream = videoRefCurr.srcObject as MediaStream
                stream.getTracks().forEach((track) => track.stop())
                videoRefCurr.srcObject = null
            }
        }
    }, [])

    // hlpr fn
    const takePhoto = () => {
        const video = videoRef.current
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageData = canvas.toDataURL('image/png')
        if (user) {
            const file = dataURLtoFile(imageData, user.user)
            setpreviewImg(imageData)
            setphoto(file)
        }
    }

    function dataURLtoFile(dataUrl: string, filename: string): File {
        const arr = dataUrl.split(',')
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png'
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }

        return new File([u8arr], filename, { type: mime })
    }

    const getBtnTxt = (): string => {
        return photoMode === 'live' ? 'Upload from local 📁' : 'Open camera 📷'
    }

    const modeChngHndlr = () => {
        setphoto(undefined)
        setpreviewImg(undefined)
        setphotoMode((prev) => (prev === 'live' ? 'local' : 'live'))
    }

    const phtoClseHndler = () => {
        setphoto(undefined)
        setpreviewImg(undefined)
    }

    const saveHndlr = () => {
        suggestPlceAction()
    }

    return (
        <Box sx={{ textAlign: 'center' }}>
            {/* img form ui */}
            {photoMode === 'local' && (
                <ImgFrm
                    setphoto={setphoto}
                    setpreviewImg={setpreviewImg}
                    photo={photo}
                />
            )}
            <Box sx={{ position: 'relative' }}>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '8px',
                        display: photoMode === 'live' ? 'block' : 'none'
                    }}
                />
                {photoMode === 'live' && (
                    <Box
                        sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%) !important' }}
                    >
                        <CmnIcnBtn onClick={takePhoto}>📷</CmnIcnBtn>
                    </Box>
                )}
            </Box>
            {/* img preview */}
            <Box sx={{ position: 'relative' }}>
                <Box
                    component={'img'}
                    src={previewImg as string}
                    sx={{ maxWidth: '50%', borderRadius: '8px', margin: '15px auto' }}
                />
                {previewImg && (
                    <>
                        <CmnIcnBtn
                            sx={{ position: 'absolute' }}
                            onClick={phtoClseHndler}
                        >
                            ❌
                        </CmnIcnBtn>
                    </>
                )}
            </Box>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
            >
                <CmnButton
                    variant="outlined"
                    title={'✅ Save'}
                    type="button"
                    disabled={!previewImg}
                    onClick={saveHndlr}
                />
                <CmnButton
                    variant="outlined"
                    title={getBtnTxt()}
                    type="button"
                    onClick={modeChngHndlr}
                />
                <CmnButton
                    variant="outlined"
                    title={'Cancel ❌'}
                    type="button"
                    onClick={onClose}
                />
            </Box>
            <canvas
                ref={canvasRef}
                style={{ display: 'none' }}
            >
                {' '}
            </canvas>
        </Box>
    )
}

export default TkeImgComp
