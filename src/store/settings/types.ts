import { ThemeColorProps } from 'react_component'

export interface SettingsInitialStateProps {
    themeColor: ThemeColorProps
    sidebarCondition: SidebarConditionProps
}

export type SidebarConditionProps = 'close' | 'open'
