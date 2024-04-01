import { useRef, useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import {
    Actions,
    Badge,
    DatePicker,
    FileViewer,
    Filter,
    FormGroup,
    Input,
    Select,
    Table,
    Td,
    Tr,
    Inspection,
    Execution,
    Texter,
    FileUploader,
    Flex,
} from 'components'
import PassportModal from '../RegistryTab/PassportModal'
import CreateModal from './CreateModal'

import {
    FeedGetMaterialDiscrepancyConditionsProps,
    FeedGetMaterialDiscrepancyUndertakingsParamsProps,
    ManDictGetCompaniesProps,
    ManDictGetMaterialRegistryProps,
    useCreateFeedbackMaterialDiscrepancyUndertakingsFileMutation,
    useCreateMaterialDiscrepancyUndertakingExecutionMutation,
    useCreateMaterialDiscrepancyUndertakingInspectionMutation,
    useDeleteFeedbackMaterialDiscrepancyUndertakingFileMutation,
    useDeleteMaterialDiscrepancyUndertakingExecutionMutation,
    useDeleteMaterialDiscrepancyUndertakingInspectionMutation,
    useDeleteMaterialDiscrepancyUndertakingMutation,
    useGetCompaniesQuery,
    useGetMaterialDiscrepancyUndertakingConditionsQuery,
    useGetMaterialDiscrepancyUndertakingsQuery,
    useGetMaterialRegistryQuery,
} from 'store/api'
import { blobToBase64 } from 'react_component'
import debounce from 'lodash/debounce'
import { useAppDispatch } from 'hooks'
import { getReportsIsoFeedbackFeedbackUndertaking } from 'store/reports'

const UndertakingsTab = () => {
    const dispatch = useAppDispatch()
    const [discrepancyId, setDiscrepancyId] = useState<number | null>(null)
    const [undertakingId, setUndertakingId] = useState<number | null>(null)
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
    const [showPassportModal, setShowPassportModal] = useState<boolean>(false)
    const [discrepancyNum, setDiscrepancyNum] = useState<string>('')
    const [responsibleName, setResponsibleName] = useState<string>('')
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [company, setCompany] = useState<ManDictGetCompaniesProps | null>(
        null,
    )
    const [filters, setFilters] =
        useState<FeedGetMaterialDiscrepancyUndertakingsParamsProps>({
            activePage: 1,
            displayLength: 10,
        })
    const [condition, setCondition] =
        useState<FeedGetMaterialDiscrepancyConditionsProps | null>(null)
    const [material, setMaterial] =
        useState<ManDictGetMaterialRegistryProps | null>(null)
    const [materialSearchString, setMaterialSearchString] = useState<string>('')
    const { data: undertakings, isFetching: isGetUndertakings } =
        useGetMaterialDiscrepancyUndertakingsQuery(filters)
    const { data: materials, isFetching: isGetMaterialsRegistry } =
        useGetMaterialRegistryQuery(
            materialSearchString
                ? {
                      material: materialSearchString,
                  }
                : undefined,
        )
    const { data: conditions } =
        useGetMaterialDiscrepancyUndertakingConditionsQuery()
    const { data: companiesDictionary } = useGetCompaniesQuery()
    const [deleteUndertaking, { isLoading: isDeleteUndertaking }] =
        useDeleteMaterialDiscrepancyUndertakingMutation()
    const [deleteExecution, { isLoading: isDeleteExecution }] =
        useDeleteMaterialDiscrepancyUndertakingExecutionMutation()
    const [deleteInspection, { isLoading: isDeleteInspection }] =
        useDeleteMaterialDiscrepancyUndertakingInspectionMutation()
    const [createExecution, { isLoading: isCreateExecution }] =
        useCreateMaterialDiscrepancyUndertakingExecutionMutation()
    const [createInspection, { isLoading: isCreateInspection }] =
        useCreateMaterialDiscrepancyUndertakingInspectionMutation()
    const [createUndertakingFile, { isLoading: isCreateUndertakingFile }] =
        useCreateFeedbackMaterialDiscrepancyUndertakingsFileMutation()
    const [deleteUndertakingFile, { isLoading: isDeleteUndertakingfile }] =
        useDeleteFeedbackMaterialDiscrepancyUndertakingFileMutation()

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
            discrepancyNum,
            responsibleName,
            materialId: material?.materialId,
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
        setResponsibleName('')
        setDiscrepancyNum('')
        setMaterial(null)
        setResponsibleName('')
    }

    return (
        <>
            <Filter
                applyFilter={submitHandler}
                resetFilter={clearHandler}
                print={() => {
                    dispatch(
                        getReportsIsoFeedbackFeedbackUndertaking({
                            format: 'xlsx',
                            ...filters,
                        }),
                    )
                }}
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
                <FormGroup label="№">
                    <Input
                        value={discrepancyNum}
                        onChange={(e) => setDiscrepancyNum(e.target.value)}
                    />
                </FormGroup>
                <FormGroup label="Отписано">
                    <Input
                        value={responsibleName}
                        onChange={(e) => setResponsibleName(e.target.value)}
                    />
                </FormGroup>
            </Filter>

            <Table
                header={[
                    { title: 'Статус', width: 120 },
                    { title: 'Компания', width: 120 },
                    { title: '№', width: 80 },
                    { title: 'Дата', width: 100 },
                    { title: 'Дата ввода', width: 100 },
                    { title: 'Фото до', width: 90 },
                    { title: 'Код МТР / Услуги', width: 150 },
                    { title: 'Наименование МТР / Услуги', width: 120 },
                    { title: 'Мероприятие' },
                    { title: 'Ответственный', width: 160 },
                    { title: 'Срок выполнения', width: 100 },
                    { title: 'Выполнил', width: 200 },
                    { title: 'Проверил', width: 200 },
                    { title: 'Подтвержд. документ', width: 100 },
                ]}
                loading={isGetUndertakings || isCreateUndertakingFile}
                pagination={undertakings?.pagination}
                rows={undertakings?.items}
                onChange={(config) =>
                    setFilters((prev) => ({
                        ...prev,
                        ...config,
                    }))
                }
                pointsFirst
                renderRow={(row) => (
                    <Tr
                        key={row.undertakingId}
                        style={{ verticalAlign: 'top' }}
                    >
                        <Td>
                            <Actions
                                hideEdit={!row.editable}
                                onEdit={() => {
                                    setUndertakingId(row.undertakingId)
                                    setShowCreateModal(true)
                                }}
                                onDelete={() =>
                                    deleteUndertaking(row.undertakingId)
                                }
                                whatToDelete="мероприятие"
                                isSubmitting={isDeleteUndertaking}
                            />
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
                        <Td>{row.insertDate}</Td>
                        <Td>
                            {!!row.discrepancyFiles?.length &&
                                row.discrepancyFiles.map((file) => (
                                    <FileViewer
                                        key={file.fileId}
                                        view="img"
                                        files={[
                                            {
                                                fileUrl: file.url,
                                            },
                                        ]}
                                    />
                                ))}
                        </Td>
                        <Td>{row.materialId}</Td>
                        <Td>{row.material}</Td>
                        <Td>{row.undertaking}</Td>
                        <Td>
                            {row.responsible?.fullName}

                            {row.redirectResponsible && (
                                <div
                                    style={{
                                        marginTop: 16,
                                    }}
                                >
                                    <Texter fontWeight="600">
                                        Переадресовано
                                    </Texter>
                                    {row.redirectResponsible.fullName}
                                </div>
                            )}
                        </Td>
                        <Td>{row.undertakingDate}</Td>
                        <Td>
                            <Flex flexDirection="column" gap="24px">
                                <Execution
                                    execution={row.execution}
                                    isShowRemove={
                                        row.editableExecution && row.editable
                                    }
                                    isShowApprove={
                                        row.editableExecution && row.editable
                                    }
                                    onRemove={() =>
                                        deleteExecution(
                                            row.execution!.executionId,
                                        )
                                    }
                                    isSubmitting={
                                        isDeleteExecution || isCreateExecution
                                    }
                                    approveWithComment
                                    onApproveWithComment={(note) =>
                                        createExecution({
                                            undertakingId: row.undertakingId,
                                            note,
                                        })
                                    }
                                />
                                {row.execution?.note && (
                                    <div>
                                        <Texter
                                            fontWeight="600"
                                            display="inline"
                                        >
                                            Комментарий:
                                        </Texter>{' '}
                                        {row.execution.note}
                                    </div>
                                )}
                            </Flex>
                        </Td>
                        <Td>
                            <Inspection
                                inspection={row.inspection}
                                isShowApprove={row.execution && row.editable}
                                isShowRemove={row.editable}
                                isSubmitting={
                                    isDeleteInspection || isCreateInspection
                                }
                                onApprove={() =>
                                    createInspection({
                                        agreed: true,
                                        executionId: row.execution!.executionId,
                                    })
                                }
                                onDisapprove={() =>
                                    createInspection({
                                        agreed: false,
                                        executionId: row.execution!.executionId,
                                    })
                                }
                                onRemove={() =>
                                    deleteInspection(
                                        row.inspection!.inspectionId,
                                    )
                                }
                            />
                        </Td>
                        <Td>
                            {!row.files?.length ? (
                                <FileUploader
                                    as="icon"
                                    title="Прикрепить документ"
                                    onDrop={async (files) => {
                                        const newFile = files[0] && {
                                            mimeType: files[0].type,
                                            file: await blobToBase64(files[0]),
                                            fileName: files[0].name,
                                        }
                                        createUndertakingFile({
                                            undertakingId: row.undertakingId,
                                            files: [newFile],
                                        })
                                    }}
                                />
                            ) : (
                                <Actions
                                    align="center"
                                    extraStart={
                                        <FileViewer
                                            view="file-button"
                                            title="Посмотреть документ"
                                            removeButton
                                            isRemoving={isDeleteUndertakingfile}
                                            onRemove={() => {
                                                !!row.files?.length &&
                                                    deleteUndertakingFile(
                                                        row.files[0].fileId,
                                                    )
                                            }}
                                            files={row.files.map((file) => ({
                                                fileUrl: file.url,
                                            }))}
                                        />
                                    }
                                    onDelete={() =>
                                        !!row.files?.length &&
                                        deleteUndertakingFile(
                                            row.files[0].fileId,
                                        )
                                    }
                                    whatToDelete="файл"
                                    isSubmitting={isDeleteUndertakingfile}
                                />
                            )}
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

            {showCreateModal && undertakingId && (
                <CreateModal
                    {...{ showCreateModal, setShowCreateModal, undertakingId }}
                />
            )}
        </>
    )
}

export default UndertakingsTab
