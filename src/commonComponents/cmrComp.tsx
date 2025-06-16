import CmnButton from '@/commonComponents/cmnButton'
import { enqueSnackBarError } from '@/utils/helper'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

const CmrComp = ({
    setphoto,
    onClose
}: {
    setphoto: Dispatch<SetStateAction<string | undefined>>
    onClose: () => void
}) => {
    // ref
    const videoRef = useRef<any>(null)
    const canvasRef = useRef<any>(null)

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
        getBase64FileSize(imageData)
        setphoto(imageData)
    }

    function getBase64FileSize(base64: string): number {
        // Remove data URL header (e.g., "data:image/png;base64,")
        const base64String = base64.split(',')[1]

        // Calculate byte length
        const byteLength =
            (base64String.length * 3) / 4 - (base64String.endsWith('==') ? 2 : base64String.endsWith('=') ? 1 : 0)
        // eslint-disable-next-line no-console
        console.log(Math.round(byteLength))
        return Math.round(byteLength) // size in bytes
    }

    return (
        <>
            <Box sx={{ textAlign: 'center' }}>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
                <CmnButton
                    variant="outlined"
                    title={'Click 📷'}
                    type="button"
                    onClick={takePhoto}
                />
                <CmnButton
                    variant="outlined"
                    title={'Cancel ❌'}
                    type="button"
                    onClick={onClose}
                />
                <canvas
                    ref={canvasRef}
                    style={{ display: 'none' }}
                >
                    {' '}
                </canvas>
            </Box>
        </>
    )
}

export default CmrComp
