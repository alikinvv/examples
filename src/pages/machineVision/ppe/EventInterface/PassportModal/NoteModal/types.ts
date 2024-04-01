export interface FormValidationProps {
    note: string
}

export interface ModalProps {
    showNoteModal: boolean
    noteId?: number
    setShowNoteModal: (state: boolean) => void
    setNoteId: (state: undefined) => void
    id: number
}
