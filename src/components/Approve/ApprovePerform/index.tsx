import { Approve, ButtonSquare, Flex, Modal } from '../..'
import { FC, useState } from 'react'
import { ApprovePerformProps, ModalTypes } from './types'

export const ApprovePerform: FC<ApprovePerformProps> = ({
    editableExecution,
    whatToDelete,
    executor,
    executionDate,
    isLoading,
    onApproveClick,
    onRemoveClick,
}) => {
    const [activeModal, setActiveModal] = useState<ModalTypes>(null)

    const modalConfig = {
        confirm: {
            text: 'Вы выполнили мероприятие',
            onConfirm: onApproveClick,
        },
        delete: {
            text: 'Вы удаляете отметку об исполнении мероприятия',
            onConfirm: onRemoveClick,
        },
    }

    return (
        <>
            {!executor ? (
                <Approve onApproveClick={() => setActiveModal('confirm')} />
            ) : (
                <Flex gap="16px" alignItems="center">
                    <div>
                        {executor}
                        <br />
                        {executionDate}
                    </div>
                    {editableExecution && (
                        <ButtonSquare
                            icon="trash"
                            onClick={() => {
                                setActiveModal('delete')
                            }}
                        />
                    )}
                </Flex>
            )}
            {activeModal && (
                <Modal
                    isOpen={true}
                    isLoading={isLoading}
                    handleClose={() => {
                        setActiveModal(null)
                    }}
                    size="small"
                    title="Внимание!"
                    handleConfirm={() => {
                        modalConfig[activeModal]
                            .onConfirm()
                            .unwrap()
                            .then(() => {
                                setActiveModal(null)
                            })
                    }}
                    labelOk="Да"
                >
                    <div style={{ textAlign: 'center' }}>
                        {modalConfig[activeModal].text}
                        {whatToDelete && (
                            <strong>
                                <br /> "{whatToDelete}"
                            </strong>
                        )}
                        ?
                    </div>
                </Modal>
            )}
        </>
    )
}
