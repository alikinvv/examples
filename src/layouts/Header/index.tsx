import { HeaderStyled } from './styles'
import { MenuCollapser } from './MenuCollapser'
import { UserDropdown } from './UserDropdown'
import CompaniesDropdown from './CompaniesDropdown'
import { SettingsView } from './SettingsView'
import { Flex } from 'components'

export const Header = () => {
    return (
        <HeaderStyled>
            <MenuCollapser />
            <Flex alignItems="center" gap="8px" style={{ height: '100%' }}>
                <CompaniesDropdown />
                <UserDropdown />
                <SettingsView />
            </Flex>
        </HeaderStyled>
    )
}
