interface setup {
  x: string,
  y: string,
  opacity: number
}

export type aniVariants = {
  initial: {
    x: string,
    y: string,
    opacity: number
  },
  out: {
    x: string,
    y: string,
    opacity: number
  },
  in: {
    x: string,
    y: string,
    opacity: number
  }
}

export interface transition {
  type: string,
  mass: number,
  damping: number,
  stiffness: number,
  velocity: number
}