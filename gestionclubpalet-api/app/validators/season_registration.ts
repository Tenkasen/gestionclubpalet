import vine from '@vinejs/vine'

export const addPlayerInSeasonValidator = vine.array(vine.number().positive().withoutDecimals())
