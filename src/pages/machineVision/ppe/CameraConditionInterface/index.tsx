import { useState } from 'react'
import colors from 'colorPalette'

import {
    ButtonGroup,
    ButtonSquare,
    Flex,
    Grid,
    PaginationChangeConfigProps,
    SelectItemProps,
    Texter,
} from 'react_component'
import { Select, FormGroup, Filter, Input, ModuleHeader } from 'react_component'
import { CamerasMap, ContentWrapper } from 'localComponents'
import GridView from './GridView'

import { ConditionStyled } from './styles'

import { DictGetCompanyOrgUnitsProps } from 'services'
import {
    GetVideoAnalyticCamerasParamsProps,
    useGetDictionaryCompanyOrgUnitsQuery,
    useGetVideoAnalyticCameraStatuesQuery,
} from 'store/api'

const RegistryTab = () => {
    const [filters, setFilters] = useState<GetVideoAnalyticCamerasParamsProps>({
        activePage: 1,
        displayLength: 20,
    })
    const [activeTab, setActiveTab] = useState<number>(1)
    const [externalNum, setExternalNum] = useState<string>('')
    const [responsibleName, setResponsibleName] = useState<string>('')
    const [companyOrgUnit, setCompanyOrgUnit] =
        useState<DictGetCompanyOrgUnitsProps | null>(null)
    const [activeStatus, setActiveStatus] = useState<SelectItemProps | null>(
        null,
    )
    const { data: cameras, isFetching: isGetCameras } =
        useGetVideoAnalyticCameraStatuesQuery(filters)
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
            <Grid template="5fr 2fr" gap="32px" alignItems="flex-end">
                <Filter
                    applyFilter={() =>
                        setFilters({
                            activePage: 1,
                            displayLength: filters.displayLength,
                            activeStatus: activeStatus
                                ? !!activeStatus?.value
                                : undefined,
                            companyUnitId: companyOrgUnit?.unitId,
                            externalNum: externalNum.length
                                ? externalNum
                                : undefined,
                            responsibleName,
                        })
                    }
                    resetFilter={() => {
                        setActiveStatus(null)
                        setCompanyOrgUnit(null)
                        setExternalNum('')
                        setResponsibleName('')
                        setFilters({
                            activePage: 1,
                            displayLength: filters.displayLength,
                        })
                    }}
                >
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
                </Filter>
                <Flex
                    gap="23px"
                    style={{ marginBottom: 25 }}
                    justifyContent="flex-end"
                >
                    <Flex alignItems="center">
                        <ConditionStyled
                            style={{ background: colors.turquoise }}
                        />
                        <Texter color="grayExtraDark">
                            Включено: {cameras?.online}
                        </Texter>
                    </Flex>
                    <Flex alignItems="center">
                        <ConditionStyled style={{ background: colors.red }} />
                        <Texter color="grayExtraDark">
                            Выключено: {cameras?.offline}
                        </Texter>
                    </Flex>
                    <Flex alignItems="center">
                        <Texter color="grayExtraDark">
                            Всего: {cameras?.amount}
                        </Texter>
                    </Flex>
                    <ButtonGroup>
                        <ButtonSquare
                            icon="map"
                            onClick={() => setActiveTab(1)}
                            color={activeTab === 1 ? 'grayDark' : 'grayLight'}
                            iconColor={
                                activeTab === 1 ? 'white' : 'grayExtraDark'
                            }
                        />
                        <ButtonSquare
                            icon="calendarYear"
                            onClick={() => setActiveTab(2)}
                            color={activeTab === 2 ? 'grayDark' : 'grayLight'}
                            iconColor={
                                activeTab === 2 ? 'white' : 'grayExtraDark'
                            }
                        />
                    </ButtonGroup>
                </Flex>
            </Grid>

            {activeTab === 1 && (
                <CamerasMap
                    cameras={cameras?.cameras}
                    loading={isGetCameras}
                    withInfo
                />
            )}

            {activeTab === 2 && (
                <GridView {...{ filters, paginationChangeHandler }} />
            )}
        </ContentWrapper>
    )
}

export default RegistryTab
