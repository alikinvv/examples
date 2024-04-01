import styled from 'styled-components/macro'

export const MenuCollapserContainerStyled = styled.div`
    display: block;
    opacity: 0.7;
    cursor: pointer;
    transition: opacity 0.3s;
    &:hover {
        opacity: 1;
    }
`

export const MenuCollapserStyled = styled.span(
    ({ theme }) => `
    display: inline-block;
    width: 19px;
    height: 1px;
    position: relative;
    top: -5px;
    transition: all ease 0.3s;
    background: ${theme.header.burgerColor};
    &:after {
        content: ' ';
        position: absolute;
        width: 19px;
        height: 1px;
        top: -6px;
        transition: all ease 0.3s;
        background: ${theme.header.burgerColor};
    }
    &:before {
        content: ' ';
        position: absolute;
        width: 19px;
        height: 1px;
        top: 6px;
        transition: all ease 0.3s;
        background: ${theme.header.burgerColor};
    }
    &:hover {
        background: ${theme.header.burgerColor};
    }
`,
)
