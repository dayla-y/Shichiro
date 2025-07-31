export const DIRECTION = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
} as const;

export const CHEST_STATE = {
    HIDDEN: 'HIDDEN',
    REVELEADED: 'REVELEADED',
    OPEN: 'OPEN',
} as const;

export const INTERACTIVE_OBJECT_TYPE = {
    AUTO: 'AUTO',
    PICKUP: 'PICKUP',
    OPEN: 'OPEN',
} as const

export const LEVEL_NAME = {
    WORLD: 'WORLD',
    DUNGEON_1: 'DUNGEON_1',
    HOSPITAL_1: 'HOSPITAL_1',
    PHARMACY_1: 'PHARMACY_1',
} as const;