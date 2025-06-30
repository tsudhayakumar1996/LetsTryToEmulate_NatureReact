import { Box, FormHelperText, Typography } from '@mui/material'
import { useCallback } from 'react'
import { Accept, useDropzone } from 'react-dropzone'
import { Controller, FieldError, useFormContext } from 'react-hook-form'

export type RhfDropzoneProps = {
    name: string
    accept?: Accept
    maxFiles?: number
    multiple?: boolean
    helperText?: string
}

export default function RhfDropzone({ name, accept, maxFiles = 1, multiple = false, helperText }: RhfDropzoneProps) {
    // hook
    const { control } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <DropZoneField
                    onChange={onChange}
                    multiple={multiple}
                    accept={accept}
                    maxFiles={maxFiles}
                    value={value}
                    helperText={helperText}
                    error={error}
                />
            )}
        />
    )
}

const DropZoneField = ({
    onChange,
    multiple,
    accept,
    maxFiles,
    value,
    error,
    helperText
}: {
    onChange: (file: File | File[]) => void
    multiple: boolean
    accept?: Accept
    maxFiles: number
    value: any
    helperText?: string
    error?: FieldError
}) => {
    // hlpr
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            onChange(multiple ? acceptedFiles : acceptedFiles[0])
        },
        [onChange, multiple]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        multiple,
        maxFiles
    })

    return (
        <Box>
            <Box
                {...getRootProps()}
                sx={{
                    border: '2px dashed #ccc',
                    borderRadius: 2,
                    padding: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: isDragActive ? '#f0f0f0' : 'transparent'
                }}
            >
                <input {...getInputProps()} />
                <Typography>
                    {isDragActive ? 'Drop the file here...' : 'Drag and drop file here, or click to select'}
                </Typography>
                {value && (
                    <Typography
                        variant="body2"
                        mt={1}
                    >
                        {multiple ? (value as File[]).map((f) => f.name).join(', ') : (value as File)?.name}
                    </Typography>
                )}
            </Box>
            <FormHelperText error={!!error}>{error ? error.message : helperText}</FormHelperText>
        </Box>
    )
}
