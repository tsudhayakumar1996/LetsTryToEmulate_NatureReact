import { useQueryMe } from '@/queryClientMethods/useQueryMe'
import RhfFileField from '@/rhfComponents/rhfFileField'
import RhfFrmPvdr from '@/rhfComponents/rhfFrmPrvdr'
import { yupResolver } from '@hookform/resolvers/yup'
import { fromBlob } from 'image-resize-compress'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

type SetFileProp = (file: File) => void

const FrmSchma = Yup.object().shape({
    photo: Yup.mixed<File>().nullable()
})

const ImgFrm = ({
    setphoto,
    photo: photoFromProp,
    setpreviewImg
}: {
    setphoto: SetFileProp
    photo?: File
    setpreviewImg: (base64: string | ArrayBuffer) => void
}) => {
    // rhf
    const methods = useForm({
        defaultValues: { photo: null },
        resolver: yupResolver(FrmSchma)
    })
    const { handleSubmit, watch, setValue } = methods

    const photo = watch('photo')

    // hook
    const { user } = useQueryMe()

    // effect
    useEffect(() => {
        if (photo) {
            const reader = new FileReader()
            reader.onload = function () {
                if (reader.result) {
                    setpreviewImg(reader.result)
                }
            }
            reader.readAsDataURL(photo)
            if (user) {
                fromBlob(photo, 50).then((r) => {
                    const newFile = new File([r], user.user, {
                        type: r.type,
                        lastModified: Date.now()
                    })
                    setphoto(newFile)
                })
            }
        }
    }, [photo, setphoto, setpreviewImg, user])

    useEffect(() => {
        if (!photoFromProp) setValue('photo', null)
    }, [photoFromProp, setValue])

    // hndlr
    const onSubmit = handleSubmit(() => {})

    return (
        <>
            <RhfFrmPvdr
                methods={methods}
                onSubmit={onSubmit}
            >
                <RhfFileField
                    name="photo"
                    accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                    multiple={false}
                />
            </RhfFrmPvdr>
        </>
    )
}

export default ImgFrm
