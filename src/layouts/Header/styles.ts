import styled from 'styled-components/macro'

export const HeaderStyled = styled.header(
    ({ theme }) => ({
        backgroundColor: theme.header.bg,
    }),
    `
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 0 16px;
    color: #c5c5c5;
`,
)
