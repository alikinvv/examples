import { useState } from 'react'
import { ContainerStyled, TogglerStyled, IconGearStyled } from './styles'
import { Panel } from './Panel'
import { useAppSelector } from 'hooks'

export const SettingsView = () => {
    const settings = useAppSelector((state) => state.settings)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const openHandler = () => setIsOpen(true)
    const closeHandler = () => setIsOpen(false)

    return (
        <ContainerStyled>
            <TogglerStyled onClick={openHandler}>
                <IconGearStyled />
            </TogglerStyled>
            <Panel
                isOpen={isOpen}
                handleClose={closeHandler}
                settings={settings}
            />
        </ContainerStyled>
    )
}
