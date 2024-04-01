import styled from 'styled-components/macro'

export const PlantSelectorStyled = styled.a<{ open: boolean }>(
    ({ theme, open }) => `
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${theme.header.color};
    font-size: 13px;
    padding: 0px 6px 0 8px;
    margin-right: 16px;
    cursor: pointer;
    height: 100%;
    background-color: ${open ? theme.header.hoverBg : 'transparent'};

    &:hover {
        background-color: ${theme.header.hoverBg};
        text-decoration: none;
    }

    .arrow {
        width: 8px;
        fill: ${theme.header.color};
        transform: ${open ? 'rotate(180deg)' : 'rotate(0deg)'};
        transition: transform 0.2s ease-in-out;
    }
`,
)
export const PlantTitleStyled = styled.span`
    margin: 0 10px 0 8px;
    font-weight: 300;
    user-select: none;
`

export const PlantListStyled = styled.ul<{ open: boolean }>(
    (props) => `
    display: ${props.open ? 'block' : 'none'};
    background-color: ${props.theme.dropdown.bg};
    position: absolute;
    left: auto;
    right: 19px;
    top: 41px;
    width: 195px;
    z-index: 999;
    list-style: none;
    padding: 0;
    padding: 0px;
    margin: 9px 0px 0px 0px;
    border: ${props.theme.dropdown.border};
    `,
)

export const PlantSelectContainerStyled = styled.div`
    position: relative;
    height: 100%;
`

export const PlantItemStyled = styled.li<{ isActive: boolean }>(
    (props) => `
    ${props.isActive && `background-color: ${props.theme.dropdown.hoverBg};`}
    font-size: 14px;
    font-weight: 300;
    color: ${props.theme.dropdown.color};
    padding: 8px 16px;
    line-height: 18px;
    white-space: nowrap;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;

    &:hover {
        background-color: ${props.theme.dropdown.hoverBg};
    }`,
)
