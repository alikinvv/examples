import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { requiredField } from 'react_component'

import { Approve, Controlled, Modal } from 'components'
import { FormValidationProps, ModalProps } from './types'

import { useCreateMaterialDiscrepancyRejectionMutation } from 'store/api'

const RejectionModal: FC<ModalProps> = ({ id }) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValidationProps>()

    const [showRejectionModal, setShowRejectionModal] = useState<boolean>(false)

    const [createRejection, { isLoading: isCreateRejection }] =
        useCreateMaterialDiscrepancyRejectionMutation()

    const submitHandler = (values: FormValidationProps) => {
        createRejection({
            discrepancyId: id,
            cause: values.cause,
        })
            .unwrap()
            .then(() => {
                reset()
                setShowRejectionModal(false)
            })
    }

    return (
        <>
            <Approve onDisapproveClick={() => setShowRejectionModal(true)} />
            <Modal
                isOpen={showRejectionModal}
                isSubmitting={isCreateRejection}
                marginBottom
                handleConfirm={handleSubmit(submitHandler)}
                handleClose={() => {
                    reset()
                    setShowRejectionModal(false)
                }}
                title="Причина отклонения обращения"
                size="small"
            >
                <Controlled.Textarea
                    label="Описание"
                    name="cause"
                    control={control}
                    error={errors.cause?.message}
                    rules={requiredField}
                    rows={4}
                />
            </Modal>
        </>
    )
}

export default RejectionModal
