import { MenuCollapserContainerStyled, MenuCollapserStyled } from './styles'
import { useAppDispatch, useUserSettings } from 'hooks'
import { createUserSettings, setSidebarCondition } from 'store/settings'

export const MenuCollapser = () => {
    const dispatch = useAppDispatch()
    const { isSidebarOpen, themeColor } = useUserSettings()

    const handleClick = async () => {
        const result = isSidebarOpen ? 'close' : 'open'
        dispatch(setSidebarCondition(result))
        dispatch(
            createUserSettings({
                sidebarCondition: result,
                themeColor,
            }),
        )
    }

    return (
        <MenuCollapserContainerStyled onClick={handleClick}>
            <MenuCollapserStyled />
        </MenuCollapserContainerStyled>
    )
}
