import { UserFieldsProps } from 'services'
import { SelectItemProps } from 'types'

export interface FormValidationProps {
    discrepancyNum: string
    undertaking: string
    correction: SelectItemProps | null
    responsible: UserFieldsProps | null
    undertakingDate: Date | null
}
