export interface ModalProps {
    showModal: boolean
    setShowModal: (state: boolean) => void
    id: number
    showControls?: boolean
    hideTabs?: boolean
}

export interface FormValidationProps {
    note: string
}
