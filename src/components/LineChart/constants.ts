import { SelectItemProps } from 'react_component'

export const interval = {
    label: 'Интервал',
    value: 'date_range',
}

export const current = {
    label: 'Текущий год',
    value: 'current_year',
}

export const previous = {
    label: 'Прошлый год',
    value: 'previous_year',
}

export interface NewDataProps {
    index: string
    x: string
    y: string
    description: string
}

export const periods: SelectItemProps[] = [current, previous, interval]

export const ChartColors = [
    '#B6BBC8',
    '#B4A6A2',
    '#E1A294',
    '#A8C3A4',
    '#C9BD92',
    '#A3B8CC',
    '#C9ACD3', // 07
    '#C2C6D2',
    '#C1B4B0',
    '#ECAB9C',
    '#B6D4B1',
    '#D6C99B',
    '#B0C6DB',
    '#D2B4DD', // 06
    '#A2A6B4',
    '#A59793',
    '#D3978A',
    '#9BB597',
    '#B9AE86',
    '#91A4B6',
    '#BFA3C9', // 08
    '#D5D8E2',
    '#CFC3BF',
    '#F8B7A9',
    '#C1E1BC',
    '#E4D7A6',
    '#BDD4E9',
    '#DDBDE9', // 05
    '#83899B',
    '#9B8D89',
    '#C38B7F',
    '#93AC8F',
    '#ACA27E',
    '#8395A5',
    '#B196BA', // 09
    '#DEE0EA',
    '#D8CBC8',
    '#FFC5B9',
    '#CBECC6',
    '#EFE1AD',
    '#C5DCF2',
    '#EBCCF5', // 04
    '#717686',
    '#897C79',
    '#B17F73',
    '#869E83',
    '#9D9473',
    '#748493',
    '#9E87A7', // 10
    '#606472',
    '#726460',
    '#A07369',
    '#768C73',
    '#8D8566',
    '#667583',
    '#8F7A97', // 11
    '#4E525E',
    '#655955',
    '#92685F',
    '#697D66',
    '#7C755A',
    '#596672',
    '#7E6B85', // 12
    '#383A43',
    '#594F4B',
    '#805B53',
    '#5B6D58',
    '#6D674F',
    '#4B5661',
    '#6A5A70', // 13
]

export const colorsGray = [
    '#B6BBC8',
    '#C2C6D2',
    '#A2A6B4',
    '#D5D8E2',
    '#83899B',
    '#DEE0EA',
    '#717686',
    '#E3E4EB',
    '#606472',
    '#ECEDF1',
    '#4E525E',
    '#F5F6FA',
    '#383A43',
    '#2D2F36',
    '#202126',
]
