import { Controlled, StepWithFooter, Texter } from 'components'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FormValidationProps } from './types'
import {
    useCreateMaterialDiscrepancyCausesMutation,
    useGetMaterialDictionaryDiscrepancyCausesQuery,
    useGetMaterialDiscrepancyCausesQuery,
} from 'store/api'
import { requiredField, useSteps } from 'react_component'
import { useLocation } from 'react-router-dom'

const CausesStep = () => {
    const { updateSteps } = useSteps()
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValidationProps>()
    const location = useLocation()
    const { id } = (location.state as { id: number }) || ''
    const { data: causes, isFetching: causesLoading } =
        useGetMaterialDictionaryDiscrepancyCausesQuery()
    const { data: cause, isFetching: causeLoading } =
        useGetMaterialDiscrepancyCausesQuery(id)
    const [createCauses] = useCreateMaterialDiscrepancyCausesMutation()

    useEffect(() => {
        if (cause) {
            cause.discrepancy && setValue('description', cause.discrepancy)
            !!cause.causes.length &&
                setValue('cause', {
                    cause: cause.causes[0].cause,
                    causeId: cause.causes[0].causeId,
                })
            !!cause.causes.length &&
                setValue('discrepancyCause', cause.causes[0].discrepancyCause)
        }
    }, [cause])

    const submitHandler = (values: FormValidationProps) => {
        createCauses({
            discrepancyId: id,
            causes: [
                {
                    causeId: values.cause.causeId,
                    discrepancyCause: values.discrepancyCause,
                },
            ],
        })
            .unwrap()
            .then(() => updateSteps([id]))
    }

    return (
        <StepWithFooter
            onSubmitClick={handleSubmit(submitHandler)}
            isEdit={!!cause}
            isLoading={causesLoading || causeLoading}
            centered="440px"
        >
            <Texter asTitle marginBottom="12px">
                Причина
            </Texter>
            <Controlled.Input
                label="Обращение"
                name="description"
                control={control}
                labelStyle={{ marginBottom: '12px' }}
                disabled
            />
            <Controlled.Select
                label="Группа причины"
                name="cause"
                control={control}
                options={causes}
                getOptionLabel={({ cause }) => cause}
                getOptionValue={({ causeId }) => causeId}
                error={errors.cause?.message}
                labelStyle={{ marginBottom: '12px' }}
                rules={requiredField}
            />
            <Controlled.Input
                label="Причина"
                name="discrepancyCause"
                control={control}
                labelStyle={{ marginBottom: '12px' }}
            />
        </StepWithFooter>
    )
}

export default CausesStep
