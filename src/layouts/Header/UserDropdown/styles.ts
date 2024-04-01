import styled from 'styled-components/macro'

export const UserSelectorContainerStyled = styled.div`
    margin-right: 20px;
    position: relative;
    height: 100%;
`

export const UserSelectorStyled = styled.a<{ open: boolean }>(
    ({ theme, open }) => `
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${theme.header.color};
    font-size: 13px;
    padding: 0 6px 0 8px;
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

    .avatar {
        width: 23px;
        fill: ${theme.header.color};
    }
`,
)
export const UserTitleStyled = styled.span`
    margin-right: 10px;
    margin-left: 5px;
    font-weight: 300;
    user-select: none;
`

export const UserMenuStyled = styled.ul<{ open: boolean }>(
    (props) => `
    display: ${props.open ? 'block' : 'none'};
    position: absolute;
    left: auto;
    right: 0;
    top: 41px;
    width: 195px;
    z-index: 999;
    list-style: none;
    padding: 0;
    padding: 0px;
    background-color: ${props.theme.dropdown.bg};
    margin: 9px 0px 0px 0px;
    border: ${props.theme.dropdown.border};
   `,
)

export const UserMenuItemStyled = styled.a(
    (props) => `
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 300;
    color: ${props.theme.dropdown.color};
    padding: 8px 16px;
    line-height: 18px;
    white-space: nowrap;
    cursor: pointer;
    text-decoration: none;
    user-select: none;
    
    &:hover {
        text-decoration: none;
        background-color: ${props.theme.dropdown.hoverBg};
    }
`,
)
export const ItemTitleStyled = styled.span`
    margin-left: 9px;
`

export const DividerStyled = styled.hr(
    (props) => `
    margin: 4px 0;
    border: none;
    height: 1px;
    background: ${props.theme.dropdown.dividerColor};
`,
)
