export interface FiltersProps {
    companyId?: boolean
    orgUnit?: boolean
    companyShop?: boolean
    period?: boolean
    harm?: boolean
    discrepancyKind?: boolean
    claim?: boolean
    system?: boolean
    condition?: boolean
    startDate?: string
    endDate?: string
}

export interface LineChartProps {
    title?: string
    disableLegend?: boolean
    count?: boolean
    tooltipY?: boolean
    toggleButton?: boolean
    fullWidth?: boolean
    filters?: FiltersProps
    action: (arg: any) => void
}
