import { FC } from 'react'

import { Description, Flex, Modal, Preloader } from 'react_component'

import { ViewModalProps } from './types'
import { ImageWrapperStyled } from '../../ViolationInterface/GridItem/styles'
import { InfoStyled } from 'localComponents/CamerasMap/styles'

import { useGetVideoAnalyticCamerasLastFrameQuery } from 'store/api'

const ViewModal: FC<ViewModalProps> = ({ showModal, setShowModal, camera }) => {
    const { data: image } = useGetVideoAnalyticCamerasLastFrameQuery(
        camera.cameraId,
    )

    return (
        <Modal
            isOpen={showModal}
            handleConfirm={() => {}}
            handleClose={() => setShowModal(false)}
            size="large"
            title="Фото с камеры"
            hideOk
            controls={<></>}
        >
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

                <InfoStyled>
                    <Description label="Подразделение:" template="130px 1fr">
                        {camera.companyUnit ? (
                            <strong>{camera.companyUnit}</strong>
                        ) : (
                            '-'
                        )}
                    </Description>
                    <Description label="Координаты:" template="130px 1fr">
                        {camera.latitude && camera.longitude ? (
                            <strong>
                                {camera.latitude}, {camera.longitude}
                            </strong>
                        ) : (
                            '-'
                        )}
                    </Description>
                    <Description label="№ камеры в цехе:" template="130px 1fr">
                        {camera.externalNum ? (
                            <strong>{camera.externalNum}</strong>
                        ) : (
                            '-'
                        )}
                    </Description>
                    <Description label="Ответственный:" template="130px 1fr">
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
                </InfoStyled>
            </ImageWrapperStyled>
        </Modal>
    )
}

export default ViewModal
