import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from 'hooks'

import { Steps } from 'components'
import CausesStep from './CausesStep'
import UndertakingStep from './UndertakingStep'

const RegistrySteps = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { id } = (location.state as { id: number }) || ''

    const { pageInterfaceUrl } = useAppSelector((state) => state.seo)

    const STEPS = [
        {
            component: <CausesStep />,
        },
        {
            component: <UndertakingStep />,
        },
    ]

    const onCloseStepsHandler = () => {
        navigate(pageInterfaceUrl, {
            state: null,
        })
    }

    return (
        <Steps
            steps={STEPS}
            onClose={onCloseStepsHandler}
            boxType
            closeWithoutModal
            marginBottom={false}
            api={{
                url: 'feedback/material/event_list',
                entityIds: [id],
            }}
        />
    )
}
export default RegistrySteps
