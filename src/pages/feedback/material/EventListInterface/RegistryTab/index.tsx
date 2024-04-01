import { useRef, useState } from 'react'
import moment from 'moment'
import { blobToBase64 } from 'react_component'
import { Link, useNavigate } from 'react-router-dom'
import debounce from 'lodash/debounce'

import {
    Actions,
    Badge,
    DatePicker,
    FileUploader,
    FileViewer,
    Filter,
    Flex,
    FormGroup,
    Input,
    Inspection,
    Select,
    Table,
    Td,
    Tr,
} from 'components'
import RejectionModal from './RejectionModal'
import PassportModal from './PassportModal'

import {
    FeedGetMaterialDiscrepanciesParamsProps,
    FeedGetMaterialDiscrepancyCausesProps,
    FeedGetMaterialDiscrepancyConditionsProps,
    ManDictGetCompaniesProps,
    ManDictGetCompanyHcmOrgUnitsProps,
    ManDictGetMaterialRegistryProps,
    useCreateMaterialDiscrepancyFileMutation,
    useGetCompaniesQuery,
    useGetCompanyHcmOrgUnitsQuery,
    useGetMaterialDictionaryDiscrepancyCausesQuery,
    useGetMaterialDiscrepanciesQuery,
    useGetMaterialDiscrepancyConditionsQuery,
    useGetMaterialRegistryQuery,
} from 'store/api'
import { getReportsIsoFeedbackFeedbackDiscrepancies } from 'store/reports'
import { useAppDispatch, useAppSelector } from 'hooks'

const RegistryTab = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { isGetReportsIsoFeedbackDiscrepanciesLoading } = useAppSelector(
        (state) => state.reports,
    )
    const [discrepancyId, setDiscrepancyId] = useState<number | null>(null)
    const [showPassportModal, setShowPassportModal] = useState<boolean>(false)
    const [discrepancyNum, setDiscrepancyNum] = useState<string>('')
    const [creatorFullName, setCreatorFullName] = useState<string>('')
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [company, setCompany] = useState<ManDictGetCompaniesProps | null>(
        null,
    )
    const [filters, setFilters] =
        useState<FeedGetMaterialDiscrepanciesParamsProps>({
            activePage: 1,
            displayLength: 10,
        })
    const [hcmOrgUnit, setHcmOrgUnit] =
        useState<ManDictGetCompanyHcmOrgUnitsProps | null>(null)
    const [condition, setCondition] =
        useState<FeedGetMaterialDiscrepancyConditionsProps | null>(null)
    const [cause, setCause] =
        useState<FeedGetMaterialDiscrepancyCausesProps | null>(null)
    const [material, setMaterial] =
        useState<ManDictGetMaterialRegistryProps | null>(null)
    const [materialSearchString, setMaterialSearchString] = useState<string>('')
    const { data: discrepancies, isFetching: isFetchingDiscrepancies } =
        useGetMaterialDiscrepanciesQuery(filters)
    const { data: companiesDictionary } = useGetCompaniesQuery()
    const { data: hcmOrgUnits } = useGetCompanyHcmOrgUnitsQuery(undefined)
    const { data: causes } =
        useGetMaterialDictionaryDiscrepancyCausesQuery(undefined)
    const { data: materials, isFetching: isGetMaterialsRegistry } =
        useGetMaterialRegistryQuery(
            materialSearchString
                ? {
                      material: materialSearchString,
                  }
                : undefined,
        )
    const { data: conditions } = useGetMaterialDiscrepancyConditionsQuery()
    const [createFile, { isLoading: createLoading }] =
        useCreateMaterialDiscrepancyFileMutation()

    const debouncedSearch = useRef(
        debounce((v: string) => {
            setMaterialSearchString(v)
        }, 1000),
    ).current

    const submitHandler = () => {
        setFilters({
            activePage: 1,
            displayLength: filters.displayLength,
            companyId: company?.companyId,
            startDate: startDate
                ? moment(startDate).format('DD-MM-YYYY')
                : undefined,
            endDate: endDate ? moment(endDate).format('DD-MM-YYYY') : undefined,
            conditionId: condition?.conditionId,
            creatorFullName,
            discrepancyNum,
            materialId: material?.materialId,
            orgUnitId: hcmOrgUnit?.id,
            causeId: cause?.causeId,
        })
    }

    const clearHandler = () => {
        setFilters({
            activePage: 1,
            displayLength: filters.displayLength,
        })
        setStartDate(null)
        setEndDate(null)
        setCondition(null)
        setCompany(null)
        setCreatorFullName('')
        setDiscrepancyNum('')
        setMaterial(null)
        setHcmOrgUnit(null)
        setCause(null)
    }

    return (
        <>
            <Filter
                applyFilter={submitHandler}
                print={() => {
                    dispatch(
                        getReportsIsoFeedbackFeedbackDiscrepancies({
                            format: 'xlsx',
                            ...filters,
                        }),
                    )
                }}
                resetFilter={clearHandler}
                isPrintLoading={isGetReportsIsoFeedbackDiscrepanciesLoading}
            >
                <FormGroup label="Компания">
                    <Select
                        options={companiesDictionary}
                        value={company}
                        onChange={(company) => setCompany(company)}
                        getOptionLabel={({ company }) => company}
                        getOptionValue={({ companyId }) => companyId}
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
                <FormGroup label="Статус">
                    <Select
                        options={conditions}
                        value={condition}
                        onChange={(condition) => setCondition(condition)}
                        getOptionLabel={({ condition }) => condition}
                        getOptionValue={({ conditionId }) => conditionId}
                    />
                </FormGroup>
                <FormGroup label="Подразделение">
                    <Select
                        options={hcmOrgUnits}
                        value={hcmOrgUnit}
                        onChange={(hcmOrgUnit) => setHcmOrgUnit(hcmOrgUnit)}
                        getOptionLabel={({ text }) => text}
                        getOptionValue={({ id }) => id}
                    />
                </FormGroup>
                <FormGroup label="МТР / Услуга">
                    <Select
                        options={materials?.records}
                        value={material}
                        onChange={(material) => setMaterial(material)}
                        getOptionLabel={({ material, materialId }) =>
                            `${materialId} - ${material}`
                        }
                        getOptionValue={({ materialId }) => materialId}
                        onInputChange={debouncedSearch}
                        isLoading={isGetMaterialsRegistry}
                    />
                </FormGroup>
                <FormGroup label="№ обращения">
                    <Input
                        value={discrepancyNum}
                        onChange={(e) => setDiscrepancyNum(e.target.value)}
                    />
                </FormGroup>
                <FormGroup label="Зарегистрировал">
                    <Input
                        value={creatorFullName}
                        onChange={(e) => setCreatorFullName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup label="Группа причин">
                    <Select
                        options={causes}
                        value={cause}
                        onChange={(cause) => setCause(cause)}
                        getOptionLabel={({ cause }) => cause}
                        getOptionValue={({ causeId }) => causeId}
                    />
                </FormGroup>
            </Filter>

            <Table
                header={[
                    { title: 'Статус', width: 120 },
                    { title: 'Компания', width: 120 },
                    { title: '№', width: 80 },
                    { title: 'Дата', width: 100 },
                    { title: 'Подразделение', width: 160 },
                    { title: 'Обращение', width: 300 },
                    { title: 'Код МТР / Услуги', width: 150 },
                    { title: 'Наименование МТР / Услуги', width: 120 },
                    { title: 'Фото до', width: 90 },
                    { title: 'Зарегистрировал', width: 160 },
                    { title: 'Причина', width: 300 },
                    { title: 'Мероприятия', width: 300 },
                ]}
                loading={isFetchingDiscrepancies || createLoading}
                pagination={discrepancies?.pagination}
                rows={discrepancies?.items}
                onChange={(config) =>
                    setFilters((prev) => ({
                        ...prev,
                        ...config,
                    }))
                }
                pointsFirst
                renderRow={(row) => (
                    <Tr
                        key={row.discrepancyId}
                        style={{ verticalAlign: 'top' }}
                    >
                        <Td>
                            {row.condition?.condition === 'Отклонено' ||
                            row.rejection ? (
                                <>
                                    Отклонен <br />
                                    {row.rejection?.fullName}
                                    <br />
                                    <br />
                                    <strong>{row.rejection?.cause}</strong>
                                </>
                            ) : (
                                <Actions
                                    width="38px"
                                    hideEdit={!row.editable}
                                    onEdit={() => {
                                        navigate(
                                            '/pages/feedback/material/event_list/create',
                                            {
                                                state: {
                                                    id: row.discrepancyId,
                                                },
                                            },
                                        )
                                    }}
                                    extraEnd={
                                        row.editableChange && (
                                            <RejectionModal
                                                id={row.discrepancyId}
                                            />
                                        )
                                    }
                                />
                            )}
                        </Td>
                        <Td>
                            <Badge bgColor={row.condition.conditionColor}>
                                {row.condition.condition}
                            </Badge>
                        </Td>
                        <Td>{row.company}</Td>
                        <Td>
                            <Link
                                to="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setDiscrepancyId(row.discrepancyId)
                                    setShowPassportModal(true)
                                }}
                            >
                                {row.discrepancyNum}
                            </Link>
                        </Td>
                        <Td>{row.discrepancyDate}</Td>
                        <Td>{row.orgUnit}</Td>
                        <Td>
                            {row.discrepancy}
                            {row.description && (
                                <>
                                    <br />
                                    <br />
                                    <strong>Доп.информация:</strong>{' '}
                                    {row.description}
                                </>
                            )}
                        </Td>
                        <Td>{row.materialId}</Td>
                        <Td>{row.material}</Td>
                        <Td>
                            {!!row.files?.length ? (
                                row.files.map((file) => (
                                    <FileViewer
                                        key={file.fileId}
                                        view="img"
                                        files={[
                                            {
                                                fileUrl: file.url,
                                            },
                                        ]}
                                    />
                                ))
                            ) : (
                                <FileUploader
                                    as="img"
                                    onDrop={async (file) => {
                                        const newFile = file[0] && {
                                            fileName: file[0].name,
                                            mimeType: file[0].type,
                                            file: await blobToBase64(file[0]),
                                        }
                                        createFile({
                                            discrepancyId: row.discrepancyId,
                                            ...newFile,
                                        })
                                    }}
                                />
                            )}
                        </Td>
                        <Td>{row.creator?.fullName}</Td>
                        <Td>
                            {!!row.causes?.length && (
                                <Flex flexDirection="column" gap="12px">
                                    {row.causes.map((cause) => (
                                        <div
                                            key={`${cause.causeId}_${cause.causeSeq}`}
                                        >
                                            <strong>{cause.cause}:</strong>
                                            <br />
                                            {cause.discrepancyCause}
                                        </div>
                                    ))}
                                </Flex>
                            )}
                        </Td>
                        <Td>
                            <Flex flexDirection="column" gap="32px">
                                {row.undertakings?.map((undertaking) => (
                                    <div key={undertaking.undertakingId}>
                                        <div style={{ marginBottom: 8 }}>
                                            {undertaking.undertaking}
                                            {undertaking.responsible && (
                                                <div>
                                                    <strong>
                                                        Ответственный:
                                                    </strong>{' '}
                                                    {
                                                        undertaking.responsible
                                                            .fullName
                                                    }
                                                </div>
                                            )}
                                            {undertaking.redirectResponsible && (
                                                <div>
                                                    <strong>
                                                        Переадресовано:
                                                    </strong>{' '}
                                                    {
                                                        undertaking
                                                            .redirectResponsible
                                                            .fullName
                                                    }
                                                </div>
                                            )}
                                            <div>
                                                <strong>
                                                    Срок выполнения:
                                                </strong>{' '}
                                                {undertaking.undertakingDate}
                                            </div>
                                        </div>

                                        <Flex
                                            gap="32px"
                                            style={{
                                                padding: undertaking.execution
                                                    ?.executor
                                                    ? '8px 0'
                                                    : 0,
                                            }}
                                        >
                                            {undertaking.execution
                                                ?.executor && (
                                                <div>
                                                    <strong>Выполнил:</strong>

                                                    <br />
                                                    <Flex
                                                        gap="8px"
                                                        alignItems="center"
                                                    >
                                                        <div>
                                                            {
                                                                undertaking
                                                                    .execution
                                                                    .executor
                                                            }
                                                            <br />
                                                            {
                                                                undertaking
                                                                    .execution
                                                                    .executionDate
                                                            }
                                                        </div>
                                                        {!!undertaking.files
                                                            .length && (
                                                            <FileViewer
                                                                view="file"
                                                                files={[
                                                                    {
                                                                        fileUrl:
                                                                            undertaking
                                                                                .files[0]
                                                                                .url,
                                                                    },
                                                                ]}
                                                            />
                                                        )}
                                                    </Flex>
                                                </div>
                                            )}
                                            <Inspection
                                                inspection={
                                                    undertaking.inspection
                                                }
                                            />
                                        </Flex>
                                    </div>
                                ))}
                            </Flex>
                        </Td>
                    </Tr>
                )}
            />

            {discrepancyId && showPassportModal && (
                <PassportModal
                    {...{
                        showPassportModal,
                        setShowPassportModal,
                        discrepancyId,
                    }}
                />
            )}
        </>
    )
}

export default RegistryTab
