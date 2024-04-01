import { GetVideoAnalyticCamerasProps } from 'store/api'

export interface GridItemProps {
    camera: GetVideoAnalyticCamerasProps
    setCamera: (value: GetVideoAnalyticCamerasProps) => void
    setShowModal: (value: boolean) => void
}
