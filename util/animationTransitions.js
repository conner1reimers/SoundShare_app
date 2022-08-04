const mainModalVariants = {
    initial: {
        y: '150%',
        opacity: 0.9
    },
    out: {
        y: '200%',
        opacity: 0
    },
    in: {

        y: '0%',
        opacity: 1

    }
}

const mainModalTransition = {
    type: 'spring',
    mass: .5,
    damping: 27,
    stiffness: 220,
    velocity: 1
}

export const modalAnimations = {mainModalVariants, mainModalTransition};