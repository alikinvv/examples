import { FC, useEffect, useState } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { useAppDispatch, useAppSelector } from 'hooks'
import moment from 'moment'
import { Button, Preloader, Select, Texter } from 'react_component'
import { LineChartProps } from './types'
import {
    DictGetCompanyOrgUnitsProps,
    MonitDictGetDiscrepancyKindsProps,
    StatGetChartProps,
} from 'services'
import {
    ChartWrapperStyled,
    CountStyled,
    FiltersStyled,
    NoDataStyled,
} from './styles'
import { SelectItemProps } from 'react_component'
import { ChartColors, current, interval, periods } from './constants'

export const LineChart: FC<LineChartProps> = ({
    title,
    disableLegend,
    count = false,
    tooltipY = false,
    fullWidth = false,
    toggleButton,
    filters,
    action,
}) => {
    const dispatch = useAppDispatch()
    const { companyId } = useAppSelector((state) => state.auth)
    const [data, setData] = useState<any>(null)
    const [countNum, setCountNum] = useState<number | null>(null)
    const [noData, setNoData] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [toggleText, setToggleText] = useState<string>('Скрыть все')
    const [preloader, setPreloader] = useState<boolean>(true)
    const [id] = useState<string>(Math.random().toString(36).substring(7))
    const [orgUnit, setOrgUnit] = useState<DictGetCompanyOrgUnitsProps | null>(
        null,
    )
    const { startDate, endDate } = useAppSelector(
        (state) => state.pages.widgets,
    )
    const [period, setPeriod] = useState<SelectItemProps>(
        endDate ? interval : current,
    )
    const [discrepancyKind, setDiscrepancyKind] =
        useState<MonitDictGetDiscrepancyKindsProps | null>(null)

    useEffect(() => {
        companyId && fetch()
    }, [dispatch, companyId])

    const fetch = () => {
        setPreloader(true)
        setNoData(false)
        setError(false)

        dispatch<any>(
            action({
                chartPeriod: period.value,
                companyId: filters?.companyId ? companyId : undefined,
                companyShopId: orgUnit?.unitId,
                startDate:
                    startDate && endDate && period
                        ? moment(startDate).format('DD-MM-yyyy')
                        : undefined,
                endDate:
                    startDate && endDate && period
                        ? moment(endDate).format('DD-MM-yyyy')
                        : undefined,
                discrepancyKindId: discrepancyKind?.kindId,
            }),
        )
            .unwrap()
            .then((res: StatGetChartProps) => {
                setPreloader(false)
                if (
                    !!res?.lines.length &&
                    Object.keys(res.lines[0].line).length
                ) {
                    setNoData(false)
                    setData(res)
                } else {
                    setData(null)
                    setNoData(true)
                    setCountNum(null)
                }
            })
            .catch(() => {
                setData(null)
                setError(true)
                setPreloader(false)
            })
    }

    useEffect(() => {
        companyId && fetch()
    }, [orgUnit, period, discrepancyKind])

    useEffect(() => {
        if (startDate && endDate) {
            period.value === 'date_range' && fetch()
            filters?.period && setPeriod(interval)
        } else if (endDate === null && startDate === null) {
            filters?.period && setPeriod(current)
            setOrgUnit(null)
            setDiscrepancyKind(null)
        }
    }, [startDate, endDate])

    useEffect(() => {
        if (data) {
            setNoData(false)
            let root = am5.Root.new(id)
            root.setThemes([am5themes_Animated['new'](root)])

            let chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    maxTooltipDistance: 0,
                }),
            )

            const generateDatas = (line: any) => {
                let data = []

                for (let key in line) {
                    data.push({
                        x: key,
                        y: line[key],
                    })
                }
                return data
            }

            var xRenderer = am5xy.AxisRendererX.new(root, {})
            xRenderer.grid.template.set('forceHidden', true)

            if (!fullWidth) {
                xRenderer.labels.template.setAll({
                    centerX: am5.p100,
                    paddingRight: -38,
                })
            }

            let xAxis = chart.xAxes.push(
                am5xy.CategoryAxis.new(root, {
                    categoryField: 'x',
                    renderer: xRenderer,
                }),
            )

            let yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    extraMax: 0.1,
                    min: 0,
                    renderer: am5xy.AxisRendererY.new(root, {}),
                }),
            )

            chart.set(
                'cursor',
                am5xy.XYCursor.new(root, {
                    behavior: 'zoomXY',
                    xAxis: xAxis,
                }),
            )

            if (data.lines.length) {
                for (let i = 0; i < data.lines.length; i++) {
                    let series = chart.series.push(
                        am5xy.LineSeries.new(root, {
                            name: data.lines[i].name,
                            xAxis: xAxis,
                            yAxis: yAxis,
                            valueYField: 'y',
                            categoryXField: 'x',
                            tooltip: am5.Tooltip.new(root, {
                                labelText: `${
                                    tooltipY ? '{valueY}' : '{name}: {valueY}'
                                }`,
                            }),
                        }),
                    )

                    const selectColor =
                        ChartColors[
                            Math.floor(Math.random() * ChartColors.length)
                        ]
                    // @ts-ignore
                    series.set('stroke', selectColor)
                    // @ts-ignore
                    series.set('fill', selectColor)

                    series.strokes.template.setAll({
                        strokeWidth: 2,
                    })

                    series.bullets.push(function () {
                        return am5.Bullet.new(root, {
                            locationY: 0,
                            sprite: am5.Circle.new(root, {
                                radius: 4,
                                stroke: root.interfaceColors.get('background'),
                                strokeWidth: 2,
                                fill: series.get('fill'),
                            }),
                        })
                    })

                    series.data.setAll(generateDatas(data.lines[i].line))
                    xAxis.data.setAll(generateDatas(data.lines[i].line))

                    series.appear(1000)
                }
            }

            let legend = chart.bottomAxesContainer.children.push(
                am5.Legend.new(root, {
                    paddingTop: 10,
                }),
            )

            let isHide = false

            document
                .getElementById(`toggle${id}`)
                ?.addEventListener('click', () => {
                    chart.series.each((chartSeries) =>
                        isHide ? chartSeries.show() : chartSeries.hide(),
                    )
                    isHide = !isHide
                    setToggleText(isHide ? 'Показать все' : 'Скрыть все')
                })

            legend.itemContainers.template.events.on('pointerover', (e) => {
                let itemContainer = e.target
                let series = itemContainer?.dataItem?.dataContext

                chart.series.each((chartSeries) => {
                    if (chartSeries !== series) {
                        // @ts-ignore
                        chartSeries.strokes.template.setAll({
                            strokeOpacity: 0.15,
                        })
                    } else {
                        // @ts-ignore
                        chartSeries.strokes.template.setAll({
                            strokeWidth: 3,
                        })
                    }
                })
            })

            legend.itemContainers.template.events.on('pointerout', () => {
                chart.series.each((chartSeries) => {
                    // @ts-ignore
                    chartSeries.strokes.template.setAll({
                        strokeOpacity: 1,
                        strokeWidth: 2,
                    })
                })
            })

            if (!disableLegend) {
                legend.data.setAll(chart.series.values)
            }

            chart.appear(1000, 100)

            root._logo?.dispose()

            let newCount = 0
            data.lines.forEach(function (lines: any) {
                for (var _key in lines.line) {
                    newCount += count !== null && lines.line[_key]
                }
            })
            setCountNum(newCount)

            return () => {
                root.dispose()
            }
        }
    }, [data])

    return (
        <div
            style={{
                gridColumn: fullWidth ? 'span 2' : 'initial',
                position: 'relative',
                minHeight: '440px',
            }}
        >
            {preloader && <Preloader />}

            <Texter fontWeight="600" fontSize="18px" marginBottom="12px">
                {title}
                {count && <CountStyled>{countNum}</CountStyled>}
            </Texter>
            {filters && (
                <FiltersStyled>
                    {filters?.period && (
                        <Select
                            options={periods}
                            value={period}
                            isClearable={false}
                            onChange={(period) => setPeriod(period)}
                            getOptionLabel={(period) => period.label}
                            getOptionValue={(period) => period.value}
                        />
                    )}
                </FiltersStyled>
            )}
            <ChartWrapperStyled>
                {data && (
                    <>
                        <div
                            {...{ id }}
                            style={{
                                width: '100%',
                                height: !noData
                                    ? '360px'
                                    : filters
                                    ? '312px'
                                    : '360px',
                            }}
                        ></div>
                        {toggleButton && (
                            <Button id={`toggle${id}`}>{toggleText}</Button>
                        )}
                    </>
                )}

                {(noData || error) && (
                    <NoDataStyled
                        style={{
                            height: filters ? '312px' : '360px',
                        }}
                    >
                        {noData
                            ? 'Записей не обнаружено'
                            : error && 'Ошибка при получении данных'}
                    </NoDataStyled>
                )}
            </ChartWrapperStyled>
        </div>
    )
}
