import { GetVideoAnalyticCamerasProps } from 'store/api'

export interface ViewModalProps {
    showModal: boolean
    setShowModal: (value: boolean) => void
    camera: GetVideoAnalyticCamerasProps
}
