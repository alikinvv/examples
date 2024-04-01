import { DictGetCompanyOrgUnitsProps } from 'services'

export interface FormValidationProps {
    externalNum: number
    cameraId: number
    latitude: number
    longitude: number
    companyOrgUnit: DictGetCompanyOrgUnitsProps
}

export interface ModalProps {
    showModal: boolean
    setShowModal: (state: boolean) => void
    id: number
}
