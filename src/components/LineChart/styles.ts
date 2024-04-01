import styled from 'styled-components/macro'

export const CountStyled = styled.span`
    font-size: 14px;
    position: relative;
    left: 7px;
    top: -7px;
`

export const ChartWrapperStyled = styled.div<{
    noData?: boolean
}>`
    ${({ noData }) =>
        noData &&
        `
        position: relative;
        user-select: none;
        pointer-events: none;

        &::before {
            content: 'Записей не обнаружено';
            color: #83899b;
            pointer-events: none;
            user-select: none;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #fcfcfe;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
`}
`

export const FiltersStyled = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    & > div {
        width: 200px;
    }
`

export const NoDataStyled = styled.div`
    position: relative;
    user-select: none;
    pointer-events: none;
    width: 100%;
    background: #fcfcfe;
    color: #83899b;
    display: flex;
    align-items: center;
    justify-content: center;
`
