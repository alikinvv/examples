import styled from 'styled-components/macro'

export const SidebarStyled = styled.div(
    ({ theme }) => `
    background-color: ${theme.sidebar.bg};
    z-index: 100;
`,
)
