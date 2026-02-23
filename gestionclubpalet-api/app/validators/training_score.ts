import vine from '@vinejs/vine'

export const createTrainingScoreValidator = vine.compile(
  vine.object({
    playerId: vine.number().positive().withoutDecimals(),
    pointsPour: vine.number().min(0).withoutDecimals(),
    pointsContre: vine.number().min(0).withoutDecimals(),
  })
)
