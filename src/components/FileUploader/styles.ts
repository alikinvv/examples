import styled from 'styled-components'
import { colors } from '../../colorPalette'

export const ContainerStyled = styled.div``

export const DragBoxStyled = styled.div`
    padding: 10px;
    border: 1px dashed grey;
    display: grid;
    justify-content: center;
`
export const ButtonBoxStyled = styled.div`
    button {
        display: flex;
        width: 100%;
    }
`

export const IconStyled = styled.div`
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    background: ${colors.grayExtraLight};
    width: 32px;
    height: 32px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-radius: 3px;

    &:hover {
        background: ${colors.grayLight};
    }

    a {
        position: relative;
        top: 2px;
        left: 1px;
    }
`

export const FileListStyled = styled.div<{ padding?: boolean }>`
    ${({ padding }) => padding && 'padding: 8px 0 0 0;'}

    h4 {
        color: ${colors.blackLight};
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
    }
`

export const FileStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    margin-bottom: 10px;
    color: ${colors.grayExtraDark};

    & > div {
        display: flex;
        align-items: center;

        svg {
            margin-right: 8px;
        }
    }

    &:last-child {
        margin-bottom: 0;
    }
`

export const ImageStyled = styled.div<{
    imgWidth: string
    imgIconSize: string
}>`
    border: 2px solid ${colors.grayDark};
    border-radius: 8px;
    width: ${({ imgWidth }) => imgWidth};
    height: ${({ imgWidth }) => imgWidth};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    svg {
        width: ${({ imgIconSize }) => imgIconSize};
        height: ${({ imgIconSize }) => imgIconSize};
    }

    &:hover {
        background-color: ${colors.grayExtraLight};
    }
`
