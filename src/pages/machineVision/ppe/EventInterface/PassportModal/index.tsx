import { FC, useState } from 'react'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import {
    Badge,
    Button,
    ButtonGroup,
    Controlled,
    Description,
    Flex,
    Grid,
    Modal,
    Tabs,
    Texter,
} from 'react_component'
import NoteModal from './NoteModal'
import PhotoTab from './PhotoTab'
import { FormValidationProps, ModalProps } from './types'
import {
    useCreateVideoAnalyticsEventsInspectionsMutation,
    useDeleteVideoAnalyticEventInspectionMutation,
    useGetVideoAnalyticEventQuery,
} from 'store/api'
import { useForm } from 'react-hook-form'
import { requiredField } from 'react_component'

const PassportModal: FC<ModalProps> = ({
    showModal,
    setShowModal,
    id,
    showControls = false,
    hideTabs = false,
}) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValidationProps>()
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [showNoteModal, setShowNoteModal] = useState<boolean>(false)
    const [showControlModal, setShowControlModal] = useState<boolean>(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [agreed, setAgreed] = useState<boolean>(false)
    const [noteId, setNoteId] = useState<number | undefined>(undefined)
    const [createInspection, { isLoading: isCreateInspection }] =
        useCreateVideoAnalyticsEventsInspectionsMutation()
    const [deleteInspection, { isLoading: isDeleteInspection }] =
        useDeleteVideoAnalyticEventInspectionMutation()
    const { data: modalData, isFetching: isGetModalData } =
        useGetVideoAnalyticEventQuery(id ?? skipToken)

    const tabs = [
        {
            name: 'Фото',
            component: <PhotoTab files={modalData?.photos} />,
        },
        {
            name: 'Видео',
            component: <PhotoTab files={modalData?.videos} />,
            // @ts-ignore
            disabled: modalData?.condition?.conditionId >= 3,
        },
    ]

    const controlHandler = async (values: FormValidationProps) =>
        modalData &&
        createInspection({
            eventId: modalData.eventId,
            agreed,
            note: values.note,
        })
            .unwrap()
            .then(() => {
                reset({ note: '' })
                setShowControlModal(false)
                setShowModal(false)
            })

    const deleteHandler = () =>
        deleteId &&
        deleteInspection(deleteId)
            .unwrap()
            .then(() => {
                setShowDeleteModal(false)
                setDeleteId(null)
            })

    const closeHandler = () => {
        setShowModal(false)
        if (window.location.hostname === 'localhost') {
            window.history.pushState('', '', `/pages/machine_vision/event`)
        } else {
            window.history.pushState(
                '',
                '',
                `/portal_react/pages/machine_vision/event`,
            )
        }
    }

    return (
        <Modal
            isOpen={showModal}
            marginBottom
            isSubmitting={isGetModalData}
            hideOk
            handleConfirm={() => {}}
            title={`Инцидент № ${modalData?.eventId}`}
            size="extraLarge"
            handleClose={closeHandler}
            controls={
                <ButtonGroup>
                    {showControls &&
                        !!modalData?.editable &&
                        !modalData?.editableInspection && (
                            <Button
                                onClick={() => {
                                    setDeleteId(modalData.eventId)
                                    setShowDeleteModal(true)
                                }}
                            >
                                Убрать отметку
                            </Button>
                        )}
                    {showControls &&
                        modalData?.editable &&
                        modalData?.editableInspection && (
                            <>
                                <Button
                                    color="red"
                                    onClick={() => {
                                        setAgreed(false)
                                        setShowControlModal(true)
                                    }}
                                >
                                    Отклонить
                                </Button>
                                <Button
                                    color="accent"
                                    onClick={() => {
                                        setAgreed(true)
                                        setShowControlModal(true)
                                    }}
                                >
                                    Согласовать
                                </Button>
                            </>
                        )}
                    <Button onClick={closeHandler}>Отмена</Button>
                </ButtonGroup>
            }
        >
            <Grid template="244px 1fr">
                <Flex
                    flexDirection="column"
                    gap="24px"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Badge bgColor={modalData?.condition.conditionColor}>
                        {modalData?.condition.condition}
                    </Badge>
                    <Flex
                        flexDirection="column"
                        gap="6px"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Texter asTitle marginBottom="8px">
                            Общая информация
                        </Texter>
                        <div>{modalData?.eventTypeDescription}</div>
                        <div>{modalData?.companyUnit}</div>
                        <div>Камера №{modalData?.externalNum}</div>
                        <div>{modalData?.eventDate}</div>
                    </Flex>
                    {modalData?.note && (
                        <Flex
                            flexDirection="column"
                            gap="6px"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <Texter asTitle marginBottom="8px">
                                Комментарий
                            </Texter>
                            <Flex
                                gap="8px"
                                justifyContent="space-between"
                                style={{ width: '100%' }}
                            >
                                {modalData.note}
                            </Flex>
                        </Flex>
                    )}
                    <Flex
                        flexDirection="column"
                        gap="6px"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Texter asTitle marginBottom="8px">
                            Обработка инцидента
                        </Texter>
                        <Description label="Диспетчер" template="100px 1fr">
                            {modalData?.confirmation?.confirm
                                ? 'Подтвержден'
                                : 'Не подтвержден'}
                            <br />
                            {modalData?.confirmation?.confirmDate}
                        </Description>
                        <Description label="Проверил" template="100px 1fr">
                            {modalData?.inspection?.inspector}
                            <br />
                            {modalData?.inspection?.inspectionDate}
                        </Description>
                    </Flex>
                </Flex>
                {hideTabs ? (
                    <PhotoTab files={modalData?.photos} />
                ) : (
                    <Tabs {...{ tabs }} />
                )}
            </Grid>

            {showNoteModal && modalData?.eventId && (
                <NoteModal
                    id={modalData.eventId}
                    {...{
                        showNoteModal,
                        setShowNoteModal,
                        noteId,
                        setNoteId,
                    }}
                />
            )}

            {showControlModal && modalData && (
                <Modal
                    isOpen={showControlModal}
                    handleConfirm={handleSubmit(controlHandler)}
                    handleClose={() => setShowControlModal(false)}
                    title="Внимание!"
                    size="small"
                    isLoading={isCreateInspection}
                >
                    <Controlled.Textarea
                        label={`Для установки отметки о ${
                            agreed ? 'согласовании' : 'отклонении'
                        } инцидента введите
                        комментарий`}
                        name="note"
                        control={control}
                        error={errors.note?.message}
                        rules={requiredField}
                        rows={4}
                    />
                </Modal>
            )}

            {showDeleteModal && (
                <Modal
                    modalDelete
                    isOpen={showDeleteModal}
                    handleConfirm={deleteHandler}
                    handleClose={() => setShowDeleteModal(false)}
                    whatToDelete="отметку"
                    isLoading={isDeleteInspection}
                />
            )}
        </Modal>
    )
}

export default PassportModal
