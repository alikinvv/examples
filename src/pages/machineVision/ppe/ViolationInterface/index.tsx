import { useState } from 'react'
import moment from 'moment'

import {
    DatePicker,
    Grid,
    NoData,
    Pagination,
    PaginationChangeConfigProps,
    PaginationItemsNum,
} from 'react_component'
import { Select, FormGroup, Filter, Input, ModuleHeader } from 'react_component'
import { ContentWrapper } from 'localComponents'
import GridItem from './GridItem'
import PassportModal from '../EventInterface/PassportModal'

import { DictGetCompanyOrgUnitsProps } from 'services'
import {
    GetVideoAnalyticDictionaryEventTypesProps,
    GetVideoAnalyticEventsParamsProps,
    useGetDictionaryCompanyOrgUnitsQuery,
    useGetVideoAnalyticDictionaryEventTypesQuery,
    useGetVideoAnalyticEventsQuery,
} from 'store/api'

const ViolationInterface = () => {
    const [filters, setFilters] = useState<GetVideoAnalyticEventsParamsProps>({
        activePage: 1,
        displayLength: 20,
        agreed: true,
    })
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [entityId, setEntityId] = useState<number | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [externalNum, setExternalNum] = useState<string>('')
    const [eventId, setEventId] = useState<string>('')
    const [companyOrgUnit, setCompanyOrgUnit] =
        useState<DictGetCompanyOrgUnitsProps | null>(null)
    const { data: types } = useGetVideoAnalyticDictionaryEventTypesQuery()
    const [type, setType] =
        useState<GetVideoAnalyticDictionaryEventTypesProps | null>(null)
    const { data: companyOrgUnits } = useGetDictionaryCompanyOrgUnitsQuery({
        level: 2,
    })
    const { data: cameras } = useGetVideoAnalyticEventsQuery(filters)

    const paginationChangeHandler = (
        paginationConfig: PaginationChangeConfigProps,
    ) => {
        setFilters((prev) => ({
            ...prev,
            ...paginationConfig,
        }))
    }

    return (
        <ContentWrapper paddingBottom>
            <ModuleHeader />
            <Filter
                applyFilter={() =>
                    setFilters({
                        activePage: 1,
                        displayLength: filters.displayLength,
                        companyUnitId: companyOrgUnit?.unitId,
                        externalNum: externalNum.length
                            ? externalNum
                            : undefined,
                        eventId: eventId.length ? eventId : undefined,
                        startDate: startDate
                            ? moment(startDate).format('DD-MM-YYYY')
                            : undefined,
                        endDate: endDate
                            ? moment(endDate).format('DD-MM-YYYY')
                            : undefined,
                        eventTypeId: type?.typeId,
                        agreed: true,
                    })
                }
                resetFilter={() => {
                    setCompanyOrgUnit(null)
                    setExternalNum('')
                    setEventId('')
                    setStartDate(null)
                    setEndDate(null)
                    setType(null)
                    setFilters({
                        activePage: 1,
                        displayLength: filters.displayLength,
                        agreed: true,
                    })
                }}
            >
                <FormGroup label="Тип инцидента">
                    <Select
                        options={types}
                        value={type}
                        onChange={(type) => setType(type)}
                        getOptionLabel={({ description }) => description}
                        getOptionValue={({ typeId }) => typeId}
                    />
                </FormGroup>
                <FormGroup label="Подразделение">
                    <Select
                        options={companyOrgUnits}
                        value={companyOrgUnit}
                        onChange={(type) => setCompanyOrgUnit(type)}
                        getOptionLabel={({ name }) => name}
                        getOptionValue={({ unitId }) => unitId}
                    />
                </FormGroup>
                <FormGroup label="№ камеры в цехе">
                    <Input
                        value={externalNum}
                        onChange={(e) => setExternalNum(e.target.value)}
                        onlyNumbers
                    />
                </FormGroup>
                <FormGroup label="Период с">
                    <DatePicker
                        onChange={(e) => setStartDate(e)}
                        selected={startDate}
                    />
                </FormGroup>
                <FormGroup label="Период по">
                    <DatePicker
                        onChange={(e) => setEndDate(e)}
                        selected={endDate}
                    />
                </FormGroup>
                <FormGroup label="№ инцидента">
                    <Input
                        value={eventId}
                        onChange={(e) => setEventId(e.target.value)}
                    />
                </FormGroup>
            </Filter>

            {!!cameras?.items.length && (
                <PaginationItemsNum
                    config={cameras.pagination}
                    onPageChange={paginationChangeHandler}
                    nums={[20, 40, 60]}
                />
            )}
            <Grid template="repeat(5, 1fr)" gap="32px 32px" alignItems="normal">
                {!!cameras?.items?.length &&
                    cameras.items.map((camera) => (
                        <GridItem
                            key={camera.cameraId}
                            {...{ camera }}
                            onClick={() => {
                                setEntityId(camera.eventId)
                                setShowModal(true)
                            }}
                        />
                    ))}
            </Grid>
            {!cameras?.items?.length && <NoData />}
            {cameras?.pagination && (
                <Pagination
                    style={{ marginBottom: 0 }}
                    config={cameras.pagination}
                    onPageChange={paginationChangeHandler}
                />
            )}

            {showModal && entityId && (
                <PassportModal
                    hideTabs
                    id={entityId}
                    {...{ showModal, setShowModal }}
                />
            )}
        </ContentWrapper>
    )
}

export default ViolationInterface
