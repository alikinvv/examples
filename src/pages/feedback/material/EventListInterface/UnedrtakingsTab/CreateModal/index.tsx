import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { requiredField } from 'react_component'
import moment from 'moment'

import { Controlled, FormGroup, Input, Modal } from 'components'

import { FormValidationProps, ModalProps } from './types'

import {
    useGetMaterialDiscrepancyUndertakingQuery,
    useUpdateMaterialDiscrepancyUndertakingMutation,
} from 'store/api'

const CreateModal: FC<ModalProps> = ({
    showCreateModal,
    setShowCreateModal,
    undertakingId,
}) => {
    const [discrepancyNum, setDiscrepancyNum] = useState<string>('')
    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormValidationProps>()

    const {
        data: undertaking,
        isLoading,
        isFetching,
    } = useGetMaterialDiscrepancyUndertakingQuery(undertakingId)
    const [updateUndertaking, { isLoading: isUpdateLoading }] =
        useUpdateMaterialDiscrepancyUndertakingMutation()

    useEffect(() => {
        if (undertaking) {
            undertaking.discrepancyNum &&
                setDiscrepancyNum(undertaking.discrepancyNum)
            undertaking.undertaking &&
                setValue('undertaking', undertaking.undertaking)
            undertaking.responsible &&
                setValue('responsible', {
                    tabNum: undertaking.responsible.tabNum,
                    fullName: undertaking.responsible.fullName,
                    position: undertaking.responsible.position,
                })
            undertaking.undertakingDate &&
                setValue(
                    'undertakingDate',
                    moment(undertaking.undertakingDate, 'DD-MM-YYYY').toDate(),
                )
        } else {
            reset()
        }
    }, [undertaking])

    const submitHandler = (values: FormValidationProps) => {
        undertaking &&
            updateUndertaking({
                discrepancyId: undertaking.discrepancyId,
                undertakingId,
                undertaking: values.undertaking,
                undertakingDate: moment(values.undertakingDate).format(
                    'DD-MM-yyyy',
                ),
                responsible: {
                    fullName: values.responsible.fullName,
                    tabNum: values.responsible.tabNum,
                    position: values.responsible.position,
                },
            })
                .unwrap()
                .then(() => {
                    reset()
                    setShowCreateModal(false)
                })
    }

    return (
        <Modal
            title="Мероприятие"
            marginBottom
            isOpen={showCreateModal}
            size="small"
            isLoading={isLoading || isFetching}
            isSubmitting={isUpdateLoading}
            handleConfirm={handleSubmit(submitHandler)}
            handleClose={() => {
                reset()
                setShowCreateModal(false)
            }}
        >
            <FormGroup label="№">
                <Input value={discrepancyNum} placeholder="" disabled />
            </FormGroup>
            <Controlled.Textarea
                label="Мероприятие"
                name="undertaking"
                error={errors.undertaking?.message}
                control={control}
                rules={requiredField}
                rows={12}
            />
            <Controlled.UserSelect
                label="Ответственный"
                name="responsible"
                control={control}
                error={errors.responsible?.message}
                rules={requiredField}
            />
            <Controlled.DatePicker
                label="Срок выполнения"
                name="undertakingDate"
                control={control}
                error={errors.undertakingDate?.message}
                rules={requiredField}
                labelStyle={{ width: 140 }}
            />
        </Modal>
    )
}

export default CreateModal
