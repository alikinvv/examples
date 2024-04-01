import { ModuleHeader } from 'react_component'
import { useAppDispatch, useAppSelector } from 'hooks'
import { ContentWrapper, LineChart, PieChart } from 'localComponents'
import {
    Button,
    ButtonGroup,
    DatePicker,
    Flex,
    FormGroup,
    Grid,
} from 'react_component'
import {
    getAvgProcessingTime,
    setEndDate,
    setStartDate,
    setClearCounter,
    getDispatcherConfirmationPercent,
    getResponsibleInspectionPercent,
} from 'store/pages/widgets'

const Statistics = () => {
    const dispatch = useAppDispatch()
    const { startDate, endDate } = useAppSelector(
        (state) => state.pages.widgets,
    )

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

            <LineChart
                tooltipY
                title="Среднее время обработки инцидентов"
                action={getAvgProcessingTime}
                filters={{
                    companyId: true,
                    period: true,
                }}
            />
            <Grid
                template="repeat(2, minmax(1px, 1fr))"
                style={{ marginTop: '40px' }}
            >
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

export default Statistics
