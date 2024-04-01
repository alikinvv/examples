import { Approve, ButtonSquare, Flex, Modal, Texter } from '../..'
import { FC, useState } from 'react'
import { ApproveCheckProps } from './types'

export const ApproveCheck: FC<ApproveCheckProps> = ({
    isDisplay,
    inspector,
    inspectionDate,
    inspectionStatus,
    isLoading,
    onApproveClick,
    onDisapproveClick,
    onRemoveClick,
}) => {
    const [activeStatus, setActiveStatus] = useState<
        'approve' | 'disapprove' | 'delete' | null
    >(null)
    const statusConfig = {
        approve: {
            text: 'Вы ПОДТВЕРЖДАЕТЕ выполнение мероприятия?',
            onConfirm: onApproveClick,
        },
        disapprove: {
            text: 'Вы ОТКЛОНЯЕТЕ выполнение мероприятия?',
            onConfirm: onDisapproveClick,
        },
        delete: {
            text: 'Убираем отметку о подтверждении исполнения?',
            onConfirm: onRemoveClick,
        },
    }

    const closeModal = () => {
        setActiveStatus(null)
    }
    return (
        <>
            {isDisplay ? (
                inspector ? (
                    <Flex gap="16px" alignItems="center">
                        <div>
                            <Texter fontWeight="600">
                                {inspectionStatus ? 'Согласовал' : 'Отклонил'}:
                            </Texter>
                            {inspector}
                            <br /> {inspectionDate}
                        </div>

                        <ButtonSquare
                            icon="trash"
                            onClick={() => {
                                setActiveStatus('delete')
                            }}
                        />
                    </Flex>
                ) : (
                    <Approve
                        onApproveClick={() => {
                            setActiveStatus('approve')
                        }}
                        onDisapproveClick={() => {
                            setActiveStatus('disapprove')
                        }}
                    />
                )
            ) : null}

            {activeStatus && (
                <Modal
                    isLoading={isLoading}
                    isOpen={true}
                    handleClose={closeModal}
                    size="small"
                    title="Внимание!"
                    handleConfirm={() => {
                        statusConfig[activeStatus]
                            .onConfirm()
                            .unwrap()
                            .then(closeModal)
                    }}
                    labelOk="Да"
                >
                    {statusConfig[activeStatus].text}
                </Modal>
            )}
        </>
    )
}
