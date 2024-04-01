import { FC } from 'react'

import { Badge, Flex, Preloader, Texter } from 'react_component'

import { GridItemProps } from './types'

import { useGetVideoAnalyticCamerasLastFrameQuery } from 'store/api'
import { ImageWrapperStyled, ItemStyled } from './styles'

const GridItem: FC<GridItemProps> = ({ camera, onClick }) => {
    const { data: image } = useGetVideoAnalyticCamerasLastFrameQuery(
        camera.cameraId,
    )

    return (
        <ItemStyled {...{ onClick }}>
            <Flex justifyContent="space-between" alignItems="center">
                <div>
                    <Texter fontWeight="600">{camera.companyUnit}</Texter>
                </div>
                {camera.eventDate}
                <Badge bgColor={camera.condition.conditionColor}>
                    {camera.externalNum}
                </Badge>
            </Flex>
            <ImageWrapperStyled>
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
            </ImageWrapperStyled>
            <Texter fontWeight="600" marginTop="16px">
                {camera.eventId}
            </Texter>
            <Texter>{camera.eventTypeDescription}</Texter>
        </ItemStyled>
    )
}

export default GridItem
