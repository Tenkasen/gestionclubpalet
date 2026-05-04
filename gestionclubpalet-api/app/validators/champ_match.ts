import vine from '@vinejs/vine'

export const createChampMatchesValidator = vine.compile(
  vine.object({
    playerId: vine.number().positive().withoutDecimals(),
    parties: vine
      .array(
        vine.object({
          pointsPour: vine.number().min(0).max(5).withoutDecimals(),
          pointsContre: vine.number().min(0).max(5).withoutDecimals(),
        })
      )
      .fixedLength(6),
  })
)
