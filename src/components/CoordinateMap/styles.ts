import styled from 'styled-components/macro'

export const CoordinateMapStyled = styled.div<{
    isMaxFigures: boolean
    withoutControls: boolean
    withoutSquare: boolean
}>`
    z-index: 0;

    & .leaflet-control-attribution > a:first-child,
    & .leaflet-draw-edit-edit {
        display: none;
    }

    ${({ isMaxFigures }) =>
        isMaxFigures &&
        `
        & .leaflet-draw-toolbar-top {
            display: none;
        }
    `}

    ${({ withoutSquare }) =>
        withoutSquare &&
        `
        & .leaflet-draw-draw-rectangle  {
            display: none;
        }
    `}

    ${({ withoutControls }) =>
        withoutControls &&
        `
        & .leaflet-draw-draw-rectangle,
        & .leaflet-draw-draw-marker,
        & .leaflet-draw-edit-remove {
            display: none;
        }
    `}
`
