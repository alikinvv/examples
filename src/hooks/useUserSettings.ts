import { useAppSelector } from './redux-hooks'
import { SettingsInitialStateProps } from 'store/settings/types'

interface useUserSettingsProps extends SettingsInitialStateProps {
    isSidebarOpen: boolean
}

export const useUserSettings = (): useUserSettingsProps => {
    const settings = useAppSelector((state) => state.settings)
    const isSidebarOpen = settings.sidebarCondition === 'open'

    return { ...settings, isSidebarOpen }
}
