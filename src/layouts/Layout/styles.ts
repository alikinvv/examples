import styled from 'styled-components/macro'

export const LayoutStyled = styled.div<{ isSidebarOpen: boolean }>`
    display: grid;
    grid-template-columns: ${({ isSidebarOpen }) =>
            isSidebarOpen ? '235px' : '45px'} auto;
    height: 100%;
    min-height: 100%;
    transition: all 0.2s ease-in-out;
`
