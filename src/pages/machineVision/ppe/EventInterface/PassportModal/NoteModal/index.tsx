import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { skipToken } from '@reduxjs/toolkit/dist/query'

import { Controlled, Modal } from 'react_component'
import { Button, ButtonGroup, requiredField } from 'react_component'

import { FormValidationProps, ModalProps } from './types'
import {
    useCreateVideoAnalyticsEventsNoteMutation,
    useDeleteVideoAnalyticsEventsNoteMutation,
    useGetVideoAnalyticEventsNoteQuery,
    useUpdateVideoAnalyticsEventsNoteMutation,
} from 'store/api'

const NoteModal: FC<ModalProps> = ({
    showNoteModal,
    setShowNoteModal,
    id,
    noteId,
    setNoteId,
}) => {
    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormValidationProps>()
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [createNote, { isLoading: isCreateNote }] =
        useCreateVideoAnalyticsEventsNoteMutation()
    const [updateNote, { isLoading: isUpdateNote }] =
        useUpdateVideoAnalyticsEventsNoteMutation()
    const [deleteNote, { isLoading: isDeleteNote }] =
        useDeleteVideoAnalyticsEventsNoteMutation()
    const { data: modalData, isFetching: isModalData } =
        useGetVideoAnalyticEventsNoteQuery(noteId ?? skipToken)

    useEffect(() => {
        if (modalData) {
            modalData.note && setValue('note', modalData.note)
        } else {
            reset()
        }
    }, [modalData])

    const submitHandler = (values: FormValidationProps) => {
        const data = {
            eventId: id,
            note: values.note,
        }
        modalData
            ? updateNote(data)
                  .unwrap()
                  .then(() => {
                      reset()
                      setShowNoteModal(false)
                  })
            : createNote(data)
                  .unwrap()
                  .then(() => {
                      reset()
                      setShowNoteModal(false)
                  })
    }

    const deleteHandler = () =>
        deleteId &&
        deleteNote(deleteId).then(() => {
            setShowDeleteModal(false)
            setShowNoteModal(false)
            setDeleteId(null)
        })

    return (
        <Modal
            isOpen={showNoteModal}
            marginBottom
            isSubmitting={isCreateNote || isUpdateNote || isModalData}
            handleConfirm={handleSubmit(submitHandler)}
            title="Комментарий"
            controls={
                <ButtonGroup>
                    <Button
                        color="accent"
                        onClick={handleSubmit(submitHandler)}
                    >
                        Сохранить
                    </Button>
                    {noteId && (
                        <Button
                            onClick={() => {
                                setDeleteId(id)
                                setShowDeleteModal(true)
                            }}
                        >
                            Удалить
                        </Button>
                    )}
                    <Button
                        onClick={() => {
                            reset()
                            setShowNoteModal(false)
                            setNoteId(undefined)
                        }}
                    >
                        Отмена
                    </Button>
                </ButtonGroup>
            }
            handleClose={() => {
                reset()
                setShowNoteModal(false)
                setNoteId(undefined)
            }}
        >
            <Controlled.Textarea
                label="Описание"
                name="note"
                control={control}
                error={errors.note?.message}
                rules={requiredField}
                rows={4}
            />

            <Modal
                modalDelete
                isOpen={showDeleteModal}
                handleConfirm={deleteHandler}
                handleClose={() => setShowDeleteModal(false)}
                whatToDelete="комментарий"
                isSubmitting={isDeleteNote}
            />
        </Modal>
    )
}

export default NoteModal
