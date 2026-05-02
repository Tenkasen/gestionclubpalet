import vine from '@vinejs/vine'

export const createPlayerValidator = vine.array(
  vine.object({
    nom: vine.string().trim().minLength(3).maxLength(100).toUpperCase(),
    prenom: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(100)
      .transform((val) => val.replace(/\b\w/g, (c) => c.toUpperCase())),
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
