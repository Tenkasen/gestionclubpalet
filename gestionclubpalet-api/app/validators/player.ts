import vine from '@vinejs/vine'

export const createPlayerValidator = vine.compile(
  vine.object({
    nom: vine.string().trim().minLength(3).maxLength(100),
    prenom: vine.string().trim().minLength(3).maxLength(100),
    isGuest: vine.boolean().optional(),
    clubId: vine.number().positive().withoutDecimals().optional().nullable(),
  })
)

export const updatePlayerValidator = vine.compile(
  vine.object({
    nom: vine.string().trim().minLength(3).maxLength(100).optional(),
    prenom: vine.string().trim().minLength(3).maxLength(100).optional(),
    isGuest: vine.boolean().optional(),
    clubId: vine.number().positive().withoutDecimals().optional().nullable(),
  })
)
