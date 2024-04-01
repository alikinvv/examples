import { ModuleHeader } from 'react_component'
import { useAppDispatch, useAppSelector } from 'hooks'
import { ContentWrapper, PieChart, StackedChart } from 'localComponents'
import { useEffect } from 'react'
import {
    Button,
    ButtonGroup,
    DatePicker,
    Flex,
    FormGroup,
    Grid,
} from 'react_component'
import { getCompanyOrgUnits } from 'store/dictionary/companyOrgUnit'
import {
    setEndDate,
    setStartDate,
    setClearCounter,
    getDispatcherConfirmationPercent,
    getResponsibleInspectionPercent,
    getDispatcherConfirmationAmount,
    getResponsibleInspectionAmount,
} from 'store/pages/widgets'

const Quality = () => {
    const dispatch = useAppDispatch()
    const { startDate, endDate } = useAppSelector(
        (state) => state.pages.widgets,
    )

    useEffect(() => {
        dispatch(
            getCompanyOrgUnits({
                level: 2,
            }),
        )
    }, [])

    return (
        <ContentWrapper paddingBottom>
            <ModuleHeader />
            <Flex justifyContent="flex-end" alignItems="flex-end" gap="8px">
                <FormGroup label="">
                    <DatePicker
                        startDate={startDate}
                        endDate={endDate}
                        // @ts-ignore
                        selectsRange
                        monthsShown={2}
                        // @ts-ignore
                        onChange={(dates: Date[]) => {
                            const [start, end] = dates
                            dispatch(setStartDate(start))
                            dispatch(setEndDate(end))
                            localStorage.setItem('start', String(start))
                            localStorage.setItem('end', String(end))
                        }}
                    />
                </FormGroup>
                <ButtonGroup>
                    <Button
                        onClick={() => {
                            dispatch(setStartDate(null))
                            dispatch(setEndDate(null))
                            dispatch(setClearCounter())
                        }}
                    >
                        Очистить все
                    </Button>
                </ButtonGroup>
            </Flex>

            <Grid
                template="repeat(2, minmax(1px, 1fr))"
                style={{ marginTop: '40px' }}
            >
                <StackedChart
                    count
                    rotateX
                    title="Обработка диспетчером по подразделениям"
                    action={getDispatcherConfirmationAmount}
                    filters={{
                        companyId: true,
                        orgUnit: true,
                        period: true,
                    }}
                    values={[
                        {
                            label: 'Подтверждено',
                            value: 'confirm',
                        },
                        {
                            label: 'Отклонено',
                            value: 'notConfirm',
                        },
                        {
                            label: 'Не обработано',
                            value: 'notProcessed',
                        },
                    ]}
                />
                <PieChart
                    count
                    colors
                    title="Обработка диспетчером"
                    action={getDispatcherConfirmationPercent}
                    filters={{
                        companyId: true,
                        period: true,
                    }}
                />
                <StackedChart
                    count
                    rotateX
                    title="Проверка сотрудниками СП по подразделениям"
                    action={getResponsibleInspectionAmount}
                    filters={{
                        companyId: true,
                        orgUnit: true,
                        period: true,
                    }}
                    values={[
                        {
                            label: 'Согласовано',
                            value: 'agreed',
                        },
                        {
                            label: 'Отклонено',
                            value: 'notAgreed',
                        },
                        {
                            label: 'Не обработано',
                            value: 'notProcessed',
                        },
                    ]}
                />
                <PieChart
                    count
                    colors
                    title="Проверка сотрудниками СП"
                    action={getResponsibleInspectionPercent}
                    filters={{
                        companyId: true,
                        period: true,
                    }}
                />
            </Grid>
        </ContentWrapper>
    )
}

export default Quality
