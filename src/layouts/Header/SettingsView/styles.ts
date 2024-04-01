import styled from 'styled-components/macro'
import { GearIcon } from 'react_component'

export const ContainerStyled = styled.div`
    position: relative;
    width: 40px;
`
export const TogglerStyled = styled.div(
    (props) => `
    top: -25px;
    right: 0;
    width: 50px;
    height: 50px;
    cursor: pointer;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: ${props.theme.header.hoverBg};
    }
`,
)

export const IconGearStyled = styled(GearIcon)(
    (props) => `
        fill: ${props.theme.header.color};
    `,
)
