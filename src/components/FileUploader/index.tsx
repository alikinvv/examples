import { useDropzone, DropzoneOptions } from 'react-dropzone'
import { Button } from '../Button'
import { ButtonSquare } from '../ButtonSquare'
import {
    ButtonBoxStyled,
    ContainerStyled,
    DragBoxStyled,
    FileListStyled,
    FileStyled,
    IconStyled,
    ImageStyled,
} from './styles'
export { FileStyled, FileListStyled } from './styles'
import { FileUploaderProps } from './types'
import {
    AttachIcon,
    AttachImageIcon,
    PdfIcon,
    ThumbsUpIcon,
} from '../../assets/icons'
import { colors } from '../../colorPalette'
import { formatSize } from '../../utils'
import { Toast } from '../toast'

export function FileUploader({
    onDrop,
    as = 'button',
    disabled,
    file = [],
    multiple,
    showTitle = true,
    showFiles = true,
    showList = true,
    title,
    buttonStyle,
    buttonText,
    imgWidth = '90px',
    imgIconSize = '37px',
    fileListStyle,
    maxFiles,
}: DropzoneOptions & FileUploaderProps) {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: ($files, fileRejections, event) => {
            const newFiles = $files.map((file) => {
                if (file.name.length > 100) {
                    var blob = new Blob([$files[0]], { type: $files[0].type })
                    return new File([blob], $files[0].name.slice(0, 98), {
                        type: $files[0].type,
                    })
                }
                return file
            })
            const FilesNum = newFiles.length + files.length
            if (maxFiles && FilesNum > maxFiles) {
                return Toast.info(
                    `Максимальное количество загружаемых файлов: ${maxFiles}`,
                )
            }
            onDrop?.($files, fileRejections, event)
        },
        multiple: multiple,
    })

    const files =
        file.length > 0
            ? file.map((file) => (
                  <FileStyled key={file.name}>
                      <div>
                          <PdfIcon />
                          {file.name} - {formatSize(file.size)}
                      </div>
                      <ButtonSquare
                          // @ts-ignore
                          onClick={() => (onDrop ? onDrop([]) : null)}
                          icon="trash"
                      />
                  </FileStyled>
              ))
            : []

    return (
        <ContainerStyled>
            {as === 'button' ? (
                <ButtonBoxStyled
                    style={buttonStyle}
                    {...getRootProps({ className: 'dropzone' })}
                >
                    <input {...getInputProps()} />
                    <Button
                        color="grayExtraDark"
                        disabled={disabled}
                        type="button"
                        icon="AttachIcon"
                    >
                        {buttonText ? buttonText : 'Выбрать файл'}
                    </Button>
                </ButtonBoxStyled>
            ) : null}
            {as === 'area' ? (
                <DragBoxStyled {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>
                        Перетащите некоторые файлы сюда или нажмите, чтобы
                        выбрать файлы
                    </p>
                </DragBoxStyled>
            ) : null}
            {as === 'icon' ? (
                <IconStyled
                    title={title}
                    {...getRootProps({ className: 'dropzone' })}
                >
                    <input {...getInputProps()} />
                    <AttachIcon />
                </IconStyled>
            ) : null}
            {as === 'approve' ? (
                <IconStyled
                    {...getRootProps({ className: 'dropzone' })}
                    title={title}
                    style={{
                        color: colors.green,
                        margin: 0,
                        width: 38,
                        height: 38,
                    }}
                >
                    <input {...getInputProps()} />
                    <ThumbsUpIcon />
                </IconStyled>
            ) : null}
            {as === 'approveText' ? (
                <Button
                    color="accent"
                    {...getRootProps({ className: 'dropzone' })}
                    title={title}
                >
                    <input {...getInputProps()} />
                    Согласовать
                </Button>
            ) : null}
            {as === 'declineText' ? (
                <Button
                    color="red"
                    {...getRootProps({ className: 'dropzone' })}
                    title={title}
                >
                    <input {...getInputProps()} />
                    Отклонить
                </Button>
            ) : null}
            {as === 'img' ? (
                <ImageStyled
                    {...{ imgWidth, title, imgIconSize }}
                    {...getRootProps({ className: 'dropzone' })}
                >
                    <input {...getInputProps()} />
                    <AttachImageIcon />
                </ImageStyled>
            ) : null}
            {files.length > 0 && showList ? (
                <FileListStyled style={fileListStyle} padding={!showTitle}>
                    {showTitle && <h4>Выбранные документы</h4>}
                    {showFiles && files}
                </FileListStyled>
            ) : null}
        </ContainerStyled>
    )
}
