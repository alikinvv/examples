import styled from 'styled-components/macro'
import { motion } from 'framer-motion'
import colors from 'colorPalette'

export const WrapperStyled = styled.div`
    height: 62vh;
    background: ${colors.grayExtraLight};
    display: flex;
    overflow: hidden;
    position: relative;
`

export const ImagesStyled = styled(motion.div)`
    width: 100%;
    height: 100%;
    display: flex;
`

export const SlideStyled = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex-shrink: 0;
    position: relative;
    z-index: 2;

    &.active {
        animation: translateToLeft 1s ease-in-out 0s forwards;

        & + div {
            animation: translateToLeft 1s ease-in-out 0s forwards;
        }
    }

    video,
    img {
        max-height: 100%;
        max-width: 100%;
    }

    @keyframes translateToLeft {
        from {
            transform: translateX(0%);
        }
        to {
            transform: translateX(-100%);
        }
    }
`

export const ArrowStyled = styled.div`
    position: relative;
    z-index: 10;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.2s ease-in-out;
    user-select: none;
    border-radius: 50%;
    background: ${colors.grayLight};
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background: ${colors.turquoise};

        path {
            fill: ${colors.white};
        }
    }

    svg {
        width: 40px;
        height: 12px;

        path {
            transition: all 0.2s ease-in-out;
        }
    }

    &.left {
        left: 10px;

        svg {
            position: relative;
            left: -1px;
        }
    }

    &.right {
        right: 10px;

        svg {
            position: relative;
            left: 1px;
        }
    }

    &.hide {
        opacity: 0;
        pointer-events: none;
    }
`
