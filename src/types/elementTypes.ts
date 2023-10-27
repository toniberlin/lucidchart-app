export enum ELEMENT_TYPES {
    RECTANGLE = 'rectangle',
    CIRCLE = 'circle'
}

export type ElementType = {
    id: string,
    type: string,
    x: number,
    y: number,
}