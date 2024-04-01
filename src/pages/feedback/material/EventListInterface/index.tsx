import { ModuleHeader, Tabs } from 'components'
import RegistryTab from './RegistryTab'
import UndertakingsTab from './UnedrtakingsTab'

const AlertSchemeInterface = () => {
    const tabs = [
        {
            name: 'Реестр',
            component: <RegistryTab />,
        },
        {
            name: 'Мероприятия',
            component: <UndertakingsTab />,
        },
    ]

    return (
        <>
            <ModuleHeader />
            <Tabs {...{ tabs }} />
        </>
    )
}

export default AlertSchemeInterface
