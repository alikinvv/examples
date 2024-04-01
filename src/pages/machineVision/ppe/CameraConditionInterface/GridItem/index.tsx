import { FC } from 'react'
import colors from 'colorPalette'

import { Description, Flex, Preloader, Texter } from 'react_component'

import { GridItemProps } from './types'
import { BadgeStyled, ImageWrapperStyled, ItemStyled } from '../styles'

import { useGetVideoAnalyticCamerasLastFrameQuery } from 'store/api'

const GridItem: FC<GridItemProps> = ({ camera, setCamera, setShowModal }) => {
    const { data: image } = useGetVideoAnalyticCamerasLastFrameQuery(
        camera.cameraId,
    )

    return (
        <ItemStyled
            onClick={() => {
                setCamera(camera)
                setShowModal(true)
            }}
        >
            <Flex justifyContent="space-between" alignItems="center">
                <div>
                    <Texter fontWeight="600">{camera.companyUnit}</Texter>
                </div>
                <BadgeStyled
                    style={{
                        background: camera.activeStatus
                            ? colors.turquoise
                            : colors.red,
                    }}
                >
                    {camera.externalNum}
                </BadgeStyled>
            </Flex>
            <ImageWrapperStyled>
                {!!camera.activeStatus ? (
                    <>
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
                        <img src={image?.url} alt="" />
                    </>
                ) : (
                    <span>Камера выключена</span>
                )}
            </ImageWrapperStyled>
            <Description label="Координаты:" template="120px 1fr" marginBottom>
                {camera.latitude && camera.longitude ? (
                    <Texter fontWeight="600">
                        {camera.latitude}, {camera.longitude}
                    </Texter>
                ) : (
                    '-'
                )}
            </Description>
            <Description label="Ответственный:" template="120px 1fr">
                {!!camera.responsible.length ? (
                    <Flex flexDirection="column" gap="16px">
                        {camera.responsible.map((item) => {
                            return (
                                <div>
                                    <strong>{item.fullName}</strong>
                                    <br />
                                    {item.position}
                                </div>
                            )
                        })}
                    </Flex>
                ) : (
                    '-'
                )}
            </Description>
        </ItemStyled>
    )
}

export default GridItem
