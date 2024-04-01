import { FC, PropsWithChildren } from 'react'
import { MainStyled } from './styles'

export const Main: FC<PropsWithChildren> = ({ children }) => {
    return <MainStyled>{children}</MainStyled>
}
