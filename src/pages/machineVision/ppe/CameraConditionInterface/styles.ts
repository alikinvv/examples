import styled from 'styled-components/macro'
import colors from 'colorPalette'

export const ConditionStyled = styled.div`
    width: 15px;
    height: 15px;
    margin-right: 8px;
`

export const ItemStyled = styled.div`
    background: ${colors.grayExtraLight};
    border-radius: 5px;
    padding: 15px 10px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    position: relative;
    top: 0;

    &:hover {
        top: -10px;
        box-shadow: 0px 26px 12px -21px rgb(132, 141, 151, 0.2);
    }
`

export const BadgeStyled = styled.div`
    color: ${colors.white};
    padding: 3px 6px;
    border-radius: 3px;
`

export const ImageWrapperStyled = styled.div`
    min-height: 174px;
    background: #eff0f5;
    margin-top: 15px;
    margin-bottom: 15px;
    position: relative;

    img {
        width: 100%;
        position: relative;
    }

    span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        user-select: none;
        pointer-events: none;
        color: ${colors.grayDark};
    }
`
