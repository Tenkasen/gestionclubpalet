import vine from '@vinejs/vine'

export const addPlayerInDayValidator = vine.array(vine.number().positive().withoutDecimals())
