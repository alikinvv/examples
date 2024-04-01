import { FC, PropsWithChildren } from 'react'
import { ContentStyled } from './styles'

export const Content: FC<PropsWithChildren> = ({ children }) => {
    return <ContentStyled>{children}</ContentStyled>
}
