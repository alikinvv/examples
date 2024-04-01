import { FC, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, Preloader } from 'react_component'
import { PhotoTabProps } from './types'
import { ArrowStyled, ImagesStyled, SlideStyled, WrapperStyled } from './styles'

const PhotoTab: FC<PhotoTabProps> = ({ files }) => {
    const [active, setActive] = useState<number>(0)

    return (
        <WrapperStyled>
            {!!files?.length && (
                <>
                    <ArrowStyled
                        className={`left ${active === 0 && 'hide'}`}
                        onClick={() => setActive(active + 1)}
                    >
                        <ArrowLeftIcon />
                    </ArrowStyled>
                    <ImagesStyled
                        transition={{ duration: 0.3, type: 'tween' }}
                        animate={{
                            transform: `translateX(${active * 100}%)`,
                        }}
                    >
                        <Preloader
                            style={{
                                background: `#eff0f5`,
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 0,
                            }}
                        />
                        {files.map((file) => (
                            <SlideStyled>
                                {file.fileTypeId === 1 ? (
                                    <video src={file.url} autoPlay></video>
                                ) : (
                                    <img src={file?.url} alt="" />
                                )}
                            </SlideStyled>
                        ))}
                    </ImagesStyled>
                    <ArrowStyled
                        className={`right ${
                            Math.abs(active) === files.length - 1 && 'hide'
                        }`}
                        onClick={() => setActive(active - 1)}
                    >
                        <ArrowRightIcon />
                    </ArrowStyled>
                </>
            )}
        </WrapperStyled>
    )
}

export default PhotoTab
