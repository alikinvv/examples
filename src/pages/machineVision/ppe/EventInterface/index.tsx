import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'

import {
    Select,
    DatePicker,
    FormGroup,
    Filter,
    Table,
    Td,
    Tr,
    ModuleHeader,
    Input,
    Checkbox,
} from 'react_component'
import { Badge, ConditionProps } from 'react_component'
import { ContentWrapper } from 'localComponents'
import PassportModal from './PassportModal'

import { DictGetCompanyOrgUnitsProps } from 'services'
import {
    GetVideoAnalyticDictionaryEventTypesProps,
    GetVideoAnalyticEventsParamsProps,
    useGetDictionaryCompanyOrgUnitsQuery,
    useGetVideoAnalyticDictionaryEventConditionsQuery,
    useGetVideoAnalyticDictionaryEventTypesQuery,
    useGetVideoAnalyticEventsQuery,
} from 'store/api'

const Event = () => {
    const { id } = useParams()
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [filters, setFilters] = useState<GetVideoAnalyticEventsParamsProps>({
        activePage: 1,
        displayLength: 10,
        confirm: true,
    })

    const [externalNum, setExternalNum] = useState<string>('')
    const [eventId, setEventId] = useState<string>('')
    const [cameraResponsibleName, setCameraResponsibleName] =
        useState<string>('')
    const [showModal, setShowModal] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(true)
    const [entityId, setEntityId] = useState<number | null>(null)
    const [companyOrgUnit, setCompanyOrgUnit] =
        useState<DictGetCompanyOrgUnitsProps | null>(null)
    const [type, setType] =
        useState<GetVideoAnalyticDictionaryEventTypesProps | null>(null)
    const [condition, setCondition] = useState<ConditionProps | null>(null)
    const { data: events, isFetching: isGetEvents } =
        useGetVideoAnalyticEventsQuery(filters)
    const { data: companyOrgUnits } = useGetDictionaryCompanyOrgUnitsQuery({
        level: 2,
    })
    const { data: types } = useGetVideoAnalyticDictionaryEventTypesQuery()
    const { data: conditions } =
        useGetVideoAnalyticDictionaryEventConditionsQuery()

    useEffect(() => {
        if (id) {
            setEntityId(+id)
            setShowModal(true)
        }
    }, [id])

    return (
        <ContentWrapper paddingBottom>
            <ModuleHeader />

            <Filter
                applyFilter={() =>
                    setFilters({
                        activePage: 1,
                        displayLength: filters.displayLength,
                        startDate: startDate
                            ? moment(startDate).format('DD-MM-YYYY')
                            : undefined,
                        endDate: endDate
                            ? moment(endDate).format('DD-MM-YYYY')
                            : undefined,
                        companyUnitId: companyOrgUnit?.unitId,
                        conditionId: condition?.conditionId,
                        eventTypeId: type?.typeId,
                        confirm: confirm ? true : undefined,
                        externalNum: externalNum.length
                            ? externalNum
                            : undefined,
                        cameraResponsibleName: cameraResponsibleName.length
                            ? cameraResponsibleName
                            : undefined,
                        eventId: eventId.length ? eventId : undefined,
                    })
                }
                resetFilter={() => {
                    setStartDate(null)
                    setEndDate(null)
                    setCompanyOrgUnit(null)
                    setCondition(null)
                    setType(null)
                    setConfirm(true)
                    setExternalNum('')
                    setCameraResponsibleName('')
                    setEventId('')
                    setFilters({
                        activePage: 1,
                        displayLength: filters.displayLength,
                        confirm: true,
                    })
                }}
                groupWidth="136px"
            >
                <FormGroup label="Статус">
                    <Select
                        options={conditions}
                        value={condition}
                        onChange={(condition) => setCondition(condition)}
                        getOptionLabel={({ condition }) => condition}
                        getOptionValue={({ conditionId }) => conditionId}
                    />
                </FormGroup>
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
                        onlyNumbers
                    />
                </FormGroup>
                <FormGroup label="Ответственный за камеру">
                    <Input
                        value={cameraResponsibleName}
                        onChange={(e) =>
                            setCameraResponsibleName(e.target.value)
                        }
                    />
                </FormGroup>
                <FormGroup>
                    <Checkbox
                        checked={confirm}
                        onChange={(check) => setConfirm(check)}
                        label="Подтверждено диспетчером"
                        marginBottom
                    />
                </FormGroup>
            </Filter>

            <Table
                header={[
                    { title: 'Статус', width: 140 },
                    { title: '№', width: 100 },
                    { title: 'Тип инцидента', width: 160 },
                    { title: 'Подразделение', width: 160 },
                    { title: '№ камеры в цехе', width: 100 },
                    { title: 'Дата и время' },
                    { title: 'Ответственный за камеру' },
                    { title: 'Диспетчер' },
                    { title: 'Проверил' },
                    { title: 'Комментарий' },
                ]}
                withoutPoints
                loading={isGetEvents}
                pagination={events?.pagination}
                rows={events?.items}
                onChange={(config) =>
                    setFilters((prev) => ({
                        ...prev,
                        ...config,
                    }))
                }
                renderRow={(row) => (
                    <Tr key={row.eventId} style={{ verticalAlign: 'top' }}>
                        <Td>
                            <Badge bgColor={row.condition.conditionColor}>
                                {row.condition.condition}
                            </Badge>
                        </Td>
                        <Td>
                            <Link
                                to="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (
                                        window.location.hostname === 'localhost'
                                    ) {
                                        window.history.pushState(
                                            { id: row.eventId },
                                            '',
                                            `/pages/machine_vision/event/${row.eventId}`,
                                        )
                                    } else {
                                        window.history.pushState(
                                            { id: row.eventId },
                                            '',
                                            `/portal_react/pages/machine_vision/event/${row.eventId}`,
                                        )
                                    }
                                    setEntityId(row.eventId)
                                    setShowModal(true)
                                }}
                            >
                                {row.eventId}
                            </Link>
                        </Td>
                        <Td>{row.eventTypeDescription}</Td>
                        <Td>{row.companyUnit}</Td>
                        <Td>{row.externalNum}</Td>
                        <Td>{row.eventDate}</Td>
                        <Td>
                            {!!row.responsibleCamera?.length &&
                                row.responsibleCamera
                                    .map((item) => item.fullName)
                                    .join(', ')}
                        </Td>
                        <Td>
                            {row.confirmation ? (
                                <>
                                    {row.confirmation.confirm
                                        ? 'Подтвержден'
                                        : 'Ложное срабатывание'}
                                    <br />
                                    {row.confirmation.confirmDate}
                                </>
                            ) : (
                                'Не подтвержден'
                            )}
                        </Td>
                        <Td>
                            {row.inspection && (
                                <>
                                    <strong>{row.inspection.status}:</strong>
                                    <br />
                                    {row.inspection.inspector} <br />
                                    {row.inspection.inspectionDate}
                                </>
                            )}
                        </Td>
                        <Td>{row.note}</Td>
                    </Tr>
                )}
            />

            {showModal && entityId && (
                <PassportModal
                    id={entityId}
                    showControls
                    {...{ showModal, setShowModal }}
                />
            )}
        </ContentWrapper>
    )
}

export default Event
