import styled from 'styled-components/macro'
import { CloseIcon } from 'react_component'
import { colors } from 'react_component'

export const ContainerStyled = styled.div<{ isOpen: boolean }>(
    (props) => `
    display: ${props.isOpen ? 'flex' : 'none'};
    position: absolute;
    width: 355px;
    height: 50px;
    z-index: 100;
    background-color: ${props.theme.dropdown.bg};
    right: 0;
    top: -25px;
    align-items: center;
    gap: 10px;
    padding-left: 7px;
`,
)

export const ColorsStyled = styled.div`
    color: ${colors.grayExtraLight};
`

export const ListStyled = styled.ul`
    list-style: none;
    padding: 0;
    display: block;
    margin: 0 !important;
`

export const ListItemStyled = styled.li<{
    isActive: boolean
    background: string
}>(
    (props) => ({
        backgroundColor: props.background,
        border: `1px solid ${props.isActive ? colors.white : colors.grayDark}`,
        boxShadow: `0 0 ${props.isActive ? '4px' : '0'} 0 rgba(0, 0, 0, 0.2)`,
    }),
    `
    width: 40px;
    height: 40px;
    margin: 0 4px;
    cursor: pointer;
    list-style: none;
    float: left;
    transition: all 0.3s ease;
    `,
)

export const PanelTitleStyled = styled.span`
    text-transform: uppercase;
`

export const IconCrossWrapperStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    cursor: pointer;
    transition: all 0.3s ease;

    path {
        fill: ${colors.white};
        transition: all 0.3s ease;
    }

    &:hover path {
        opacity: 0.5;
    }
`

export const IconCrossStyled = styled(CloseIcon)(
    (props) => `
        display: flex;
        align-items: center;
        justify-content: center;
        fill: ${props.theme.header.color};
    `,
)
