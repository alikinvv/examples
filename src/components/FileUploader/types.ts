import { CSSProperties } from 'styled-components'
import { DropzoneOptions } from 'react-dropzone'
export interface FileUploaderProps extends DropzoneOptions {
    as?:
        | 'button'
        | 'area'
        | 'icon'
        | 'img'
        | 'approve'
        | 'approveText'
        | 'declineText'
    file?: File[]
    showList?: boolean
    style?: CSSProperties
    fileListStyle?: CSSProperties
    showTitle?: boolean
    showFiles?: boolean
    title?: string
    buttonText?: string
    buttonStyle?: CSSProperties
    imgWidth?: string
    imgIconSize?: string
}
