import styled from 'styled-components/macro'
import colors from 'colorPalette'

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

export const ImageWrapperStyled = styled.div`
    display: flex;
    align-items: center;
    min-height: 178px;
    background: #eff0f5;
    margin-top: 15px;
    margin-bottom: 15px;
    position: relative;

    img {
        width: 100%;
        position: relative;
    }
`
