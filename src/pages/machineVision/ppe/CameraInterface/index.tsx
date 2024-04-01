import { useState } from 'react'
import 'localComponents/CoordinateMap/leaflet.css'

import {
    Filter,
    Select,
    ModuleHeader,
    FormGroup,
    Table,
    Td,
    Tr,
    Input,
    Grid,
    ThPoints,
    Th,
} from 'react_component'
import { CamerasMap, ContentWrapper } from 'localComponents'
import CreateModal from './CreateModal'
import {
    Actions,
    ButtonSquare,
    Checkbox,
    SelectItemProps,
    Toast,
} from 'react_component'

import { DictGetCompanyOrgUnitsProps } from 'services'
import {
    GetVideoAnalyticCamerasParamsProps,
    useGetDictionaryCompanyOrgUnitsQuery,
    useGetVideoAnalyticCamerasQuery,
} from 'store/api'

const CameraInterface = () => {
    const [filters, setFilters] = useState<GetVideoAnalyticCamerasParamsProps>({
        activePage: 1,
        displayLength: 10,
    })
    const [companyOrgUnit, setCompanyOrgUnit] =
        useState<DictGetCompanyOrgUnitsProps | null>(null)
    const [selectedCameraId, setSelectedCameraId] = useState<
        number | undefined
    >(undefined)
    const [editCamera, setEditCamera] = useState<number | undefined>(undefined)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [externalNum, setExternalNum] = useState<string>('')
    const [responsibleName, setResponsibleName] = useState<string>('')
    const [companyUnitExist, setCompanyUnitExist] = useState<boolean>(false)
    const [activeStatus, setActiveStatus] = useState<SelectItemProps | null>(
        null,
    )
    const { data: cameras, isFetching: isGetCameras } =
        useGetVideoAnalyticCamerasQuery(filters)
    const { data: companyOrgUnits } = useGetDictionaryCompanyOrgUnitsQuery({
        level: 2,
    })

    const activeStatuses: SelectItemProps[] = [
        {
            label: 'Включена',
            value: 1,
        },
        {
            label: 'Выключена',
            value: 0,
        },
    ]

    return (
        <ContentWrapper paddingBottom>
            <ModuleHeader />
            <Filter
                applyFilter={() =>
                    setFilters({
                        activePage: 1,
                        displayLength: filters.displayLength,
                        activeStatus: activeStatus
                            ? !!activeStatus.value
                            : undefined,
                        companyUnitId: companyOrgUnit?.unitId,
                        companyUnitExist: companyUnitExist ? false : undefined,
                        externalNum: externalNum.length
                            ? externalNum
                            : undefined,
                        responsibleName: responsibleName.length
                            ? responsibleName
                            : undefined,
                    })
                }
                resetFilter={() => {
                    setActiveStatus(null)
                    setCompanyOrgUnit(null)
                    setCompanyUnitExist(false)
                    setExternalNum('')
                    setResponsibleName('')
                    setFilters({
                        activePage: 1,
                        displayLength: filters.displayLength,
                    })
                }}
            >
                <FormGroup label="№ камеры в цехе">
                    <Input
                        value={externalNum}
                        onChange={(e) => setExternalNum(e.target.value)}
                        onlyNumbers
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
                <FormGroup label="Ответственный">
                    <Input
                        value={responsibleName}
                        onChange={(e) => setResponsibleName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup label="Статус">
                    <Select
                        options={activeStatuses}
                        value={activeStatus}
                        onChange={(activeStatus) =>
                            setActiveStatus(activeStatus)
                        }
                        getOptionLabel={({ label }) => label}
                        getOptionValue={({ value }) => value}
                    />
                </FormGroup>
                <FormGroup>
                    <Checkbox
                        checked={companyUnitExist}
                        onChange={(check) => setCompanyUnitExist(check)}
                        label="Не привязанные"
                        marginBottom
                    />
                </FormGroup>
            </Filter>

            <Grid template="1fr 531px" gap="32px">
                <Table
                    header={
                        <>
                            <Tr>
                                <ThPoints rowSpan={2} />
                                <Th rowSpan={2}>№</Th>
                                <Th rowSpan={2}>№ камеры в цехе</Th>
                                <Th colSpan={2}>Координаты</Th>
                                <Th rowSpan={2}>Подразделение</Th>
                                <Th rowSpan={2}>Ответственный</Th>
                                <Th rowSpan={2}>Статус</Th>
                            </Tr>
                            <Tr>
                                <Th>Долгота</Th>
                                <Th>Широта</Th>
                            </Tr>
                        </>
                    }
                    loading={isGetCameras}
                    pagination={cameras?.pagination}
                    rows={cameras?.items}
                    onChange={(config) =>
                        setFilters((prev) => ({
                            ...prev,
                            ...config,
                        }))
                    }
                    renderRow={(row) => (
                        <Tr key={row.cameraId}>
                            <Td>
                                <Actions
                                    onEdit={() => {
                                        setEditCamera(row.cameraId)
                                        setShowModal(true)
                                    }}
                                    extraEnd={
                                        <ButtonSquare
                                            icon="preview"
                                            onClick={() => {
                                                !!row.activeStatus
                                                    ? setSelectedCameraId(
                                                          row.cameraId,
                                                      )
                                                    : Toast.error(
                                                          'Камера выключена',
                                                      )
                                            }}
                                        />
                                    }
                                />
                            </Td>
                            <Td>{row.cameraId}</Td>
                            <Td>{row.externalNum}</Td>
                            <Td>{row.longitude}</Td>
                            <Td>{row.latitude}</Td>
                            <Td>{row.companyUnit}</Td>
                            <Td>
                                {row.responsible
                                    ?.map((item) => item.fullName)
                                    .join(', ')}
                            </Td>
                            <Td>
                                {row.activeStatus ? 'Включена' : 'Выключена'}
                            </Td>
                        </Tr>
                    )}
                />

                <CamerasMap
                    cameras={cameras?.items}
                    width="531px"
                    height="531px"
                    mapPaddingTop
                    loading={isGetCameras}
                    {...{ selectedCameraId, setSelectedCameraId }}
                />
            </Grid>

            {showModal && editCamera && (
                <CreateModal id={editCamera} {...{ showModal, setShowModal }} />
            )}
        </ContentWrapper>
    )
}

export default CameraInterface
