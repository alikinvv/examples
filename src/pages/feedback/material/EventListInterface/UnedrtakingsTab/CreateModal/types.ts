import { UserFieldsProps } from 'services'
import { SelectItemProps } from 'types'

export interface FormValidationProps {
    undertakingType: SelectItemProps
    undertaking: string
    responsible: UserFieldsProps
    undertakingDate: Date
}

export interface ModalProps {
    undertakingId: number
    showCreateModal: boolean
    setShowCreateModal: (state: boolean) => void
}
