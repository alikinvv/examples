import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { Flex, FormGroup, UserSelect } from 'react_component'

import { Controlled, Grid, Modal } from 'react_component'
import { CamerasMap } from 'localComponents'

import { FormValidationProps, ModalProps } from './types'

import { UserFieldsProps } from 'services'
import {
    useGetDictionaryCompanyOrgUnitsQuery,
    useGetVideoAnalyticCameraQuery,
    useUpdateVideoAnalyticsCameraMutation,
} from 'store/api'

const CreateModal: FC<ModalProps> = ({ showModal, setShowModal, id }) => {
    const { control, handleSubmit, setValue, reset } =
        useForm<FormValidationProps>()
    const [responsible, setResponsible] = useState<UserFieldsProps[]>([])
    const [updateCamera] = useUpdateVideoAnalyticsCameraMutation()
    const { data: modalData } = useGetVideoAnalyticCameraQuery(id ?? skipToken)
    const { data: companyOrgUnits } = useGetDictionaryCompanyOrgUnitsQuery({
        level: 2,
    })

    useEffect(() => {
        if (modalData) {
            setValue('cameraId', modalData.cameraId)
            setValue('externalNum', modalData.externalNum)
            setValue('latitude', modalData.latitude)
            setValue('longitude', modalData.longitude)
            modalData.companyUnitId &&
                setValue('companyOrgUnit', {
                    name: modalData.companyUnit,
                    unitId: modalData.companyUnitId,
                })
            !!modalData.responsible.length &&
                // @ts-ignore
                setResponsible(modalData.responsible)
        } else {
            reset()
        }
    }, [modalData])

    const submitHandler = (values: FormValidationProps) =>
        modalData &&
        updateCamera({
            cameraId: modalData.cameraId,
            companyUnitId: values.companyOrgUnit?.unitId,
            responsible: responsible?.map((item) => {
                return {
                    fullName: item.fullName,
                    tabNum: item.tabNum,
                    email: item.email,
                    position: item.position,
                }
            }),
        })
            .unwrap()
            .then(() => {
                reset()
                setShowModal(false)
            })

    return (
        <Modal
            isOpen={showModal}
            marginBottom
            handleConfirm={handleSubmit(submitHandler)}
            handleClose={() => {
                reset()
                setShowModal(false)
            }}
            size="large"
            title="Камеры СП"
        >
            <Grid template="minmax(1px,1fr) 312px" gap="32px">
                <Flex flexDirection="column" gap="12px">
                    <Controlled.Input
                        label="№"
                        name="cameraId"
                        control={control}
                        disabled
                    />
                    <Controlled.Input
                        label="№ камеры в цехе"
                        name="externalNum"
                        control={control}
                        disabled
                    />
                    <Grid template="1fr 1fr">
                        <Controlled.Input
                            label="Долгота"
                            name="longitude"
                            control={control}
                            disabled
                        />
                        <Controlled.Input
                            label="Широта"
                            name="latitude"
                            control={control}
                            disabled
                        />
                    </Grid>
                    <Controlled.Select
                        label="Подразделение"
                        name="companyOrgUnit"
                        control={control}
                        options={companyOrgUnits}
                        getOptionLabel={({ name }) => name}
                        getOptionValue={({ unitId }) => unitId}
                    />
                    <FormGroup label="Ответственный">
                        <UserSelect
                            isMulti
                            value={responsible}
                            onChange={(user) =>
                                // @ts-ignore
                                user && setResponsible(user)
                            }
                        />
                    </FormGroup>
                </Flex>
                {modalData && (
                    <CamerasMap
                        cameras={[modalData]}
                        width="312px"
                        height="312px"
                        selectedCameraId={modalData.cameraId}
                        smallCamera
                    />
                )}
            </Grid>
        </Modal>
    )
}

export default CreateModal
