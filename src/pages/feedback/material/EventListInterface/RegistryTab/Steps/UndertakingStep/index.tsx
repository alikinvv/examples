import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { requiredField, useSteps } from 'react_component'
import moment from 'moment'
import {
    Actions,
    Button,
    ButtonGroup,
    Controlled,
    Form,
    Grid,
    Table,
    Td,
    Tr,
} from 'components'
import { FormValidationProps } from './types'
import {
    AudCreateDiscrepancyUndertakingParamsProps,
    AudUpdateDiscrepancyUndertakingParamsProps,
    FeedGetMaterialDiscrepanciesUndertakingsProps,
    useCreateMaterialDiscrepancyUndertakingMutation,
    useDeleteMaterialDiscrepancyUndertakingMutation,
    useGetMaterialDiscrepanciesUndertakingsQuery,
    useGetMaterialDiscrepancyQuery,
    useUpdateMaterialDiscrepancyUndertakingMutation,
} from 'store/api'

const UndertakingStep = () => {
    const { updateSteps } = useSteps()
    const location = useLocation()
    const { id } = (location.state as { id: number }) || ''
    const { data: discrepancy } = useGetMaterialDiscrepancyQuery(id, {
        skip: !id,
    })

    const defaultValues = {
        discrepancyNum: discrepancy?.discrepancyNum || '',
        undertaking: '',
        correction: null,
        responsible: null,
        undertakingDate: null,
    }
    const {
        control,
        handleSubmit,
        setValue,
        reset,
        clearErrors,
        formState: { errors },
    } = useForm<FormValidationProps>({
        defaultValues,
    })

    const [editEntity, setEditEntity] =
        useState<FeedGetMaterialDiscrepanciesUndertakingsProps | null>(null)

    const {
        data: undertakings,
        isLoading,
        isFetching,
    } = useGetMaterialDiscrepanciesUndertakingsQuery(id)
    const [createUndertaking, { isLoading: isCreateLoading }] =
        useCreateMaterialDiscrepancyUndertakingMutation()
    const [updateUndertaking, { isLoading: isUpdateLoading }] =
        useUpdateMaterialDiscrepancyUndertakingMutation()
    const [deleteUndertaking, { isLoading: isDeleteLoading }] =
        useDeleteMaterialDiscrepancyUndertakingMutation()

    const afterSuccessStore = () => {
        updateSteps([id])
        resetForm()
    }

    const resetForm = () => {
        reset()
        setEditEntity(null)
    }

    const submitHandler = (values: FormValidationProps) => {
        const data: AudCreateDiscrepancyUndertakingParamsProps = {
            discrepancyId: id,
            undertaking: values.undertaking,
            undertakingDate: moment(values.undertakingDate).format(
                'DD-MM-yyyy',
            ),
            responsible: {
                fullName: values.responsible!.fullName,
                tabNum: values.responsible!.tabNum,
                position: values.responsible!.position,
            },
        }
        if (editEntity) {
            const updateData: AudUpdateDiscrepancyUndertakingParamsProps = {
                ...data,
                undertakingId: editEntity.undertakingId,
            }
            updateUndertaking(updateData).unwrap().then(afterSuccessStore)
            return
        }
        createUndertaking(data).unwrap().then(afterSuccessStore)
    }

    const editHandler = (
        item: FeedGetMaterialDiscrepanciesUndertakingsProps,
    ) => {
        clearErrors()
        setEditEntity(item)

        item.undertaking && setValue('undertaking', item.undertaking)
        item.responsible &&
            setValue('responsible', {
                fullName: item.responsible.fullName,
                tabNum: item.responsible.tabNum,
                position: item.responsible.position,
            })
        item.discrepancyDate &&
            setValue(
                'undertakingDate',
                moment(item.undertakingDate, 'DD-MM-YYYY').toDate(),
            )
    }

    useEffect(() => {
        discrepancy?.discrepancyNum &&
            setValue('discrepancyNum', discrepancy.discrepancyNum)
    }, [discrepancy])

    return (
        <Grid template="minmax(1px, 248px) auto" gap="32px">
            <Form onSubmit={handleSubmit(submitHandler)}>
                <Controlled.Input
                    label="№ обращения"
                    name="discrepancyNum"
                    control={control}
                    labelStyle={{ marginBottom: '10px' }}
                    disabled
                />

                <Controlled.Textarea
                    label="Мероприятие"
                    name="undertaking"
                    control={control}
                    rules={requiredField}
                    labelStyle={{ marginBottom: '10px' }}
                    error={errors.undertaking?.message}
                    rows={12}
                />
                <Controlled.UserSelect
                    label="Ответственный"
                    name="responsible"
                    control={control}
                    error={errors.responsible?.message}
                    rules={requiredField}
                    labelStyle={{ marginBottom: '10px' }}
                />
                <Controlled.DatePicker
                    label="Срок выполнения"
                    name="undertakingDate"
                    control={control}
                    error={errors.undertakingDate?.message}
                    rules={requiredField}
                    labelStyle={{ marginBottom: '10px', width: 140 }}
                />
                <ButtonGroup align="flex-end">
                    {editEntity && <Button onClick={resetForm}>Отмена</Button>}
                    <Button
                        type="submit"
                        color="accent"
                        isLoading={isCreateLoading || isUpdateLoading}
                    >
                        {editEntity ? 'Обновить' : 'Добавить'}
                    </Button>
                </ButtonGroup>
            </Form>

            <Table
                header={[
                    { title: 'Мероприятие' },
                    { title: 'Ответственный', width: 240 },
                    { title: 'Срок выполнения', width: 160 },
                ]}
                rows={undertakings}
                loading={isLoading || isFetching}
                renderRow={(row) => (
                    <Tr key={row.undertakingId}>
                        <Td>{row.undertaking}</Td>
                        <Td>{row.responsible?.fullName}</Td>
                        <Td>{row.undertakingDate}</Td>
                        <Td>
                            <Actions
                                onDelete={() => {
                                    deleteUndertaking(row.undertakingId)
                                        .unwrap()
                                        .then(() => updateSteps([id]))
                                }}
                                onEdit={() => editHandler(row)}
                                whatToDelete="мероприятие"
                                isSubmitting={isDeleteLoading}
                            />
                        </Td>
                    </Tr>
                )}
            />
        </Grid>
    )
}

export default UndertakingStep
