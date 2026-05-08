import vine from '@vinejs/vine'

export const createPlayerValidator = vine.compile(
  vine.object({
    nom: vine.string().trim().minLength(3).maxLength(100).toUpperCase(),
    prenom: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(100)
      .transform((val) =>
        val
          .trim()
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ')
      ),
    email: vine.string().email().optional(),
    telephone: vine
      .string()
      .mobile({ locale: ['fr-FR'] })
      .optional(),
    anniversaire: vine
      .date({
        formats: ['DD/MM/YYYY', 'DD MM YYYY', 'DD-MM-YYYY'],
      })
      .optional(),
    dateInscription: vine
      .date({
        formats: ['DD/MM/YYYY', 'DD MM YYYY', 'DD-MM-YYYY'],
      })
      .optional(),
    isGuest: vine.boolean().optional(),
    clubId: vine.number().positive().withoutDecimals().optional().nullable(),
  })
)

export const updatePlayerValidator = vine.compile(
  vine.object({
    nom: vine.string().trim().minLength(3).maxLength(100).optional(),
    prenom: vine.string().trim().minLength(3).maxLength(100).optional(),
    email: vine.string().email().optional(),
    telephone: vine
      .string()
      .mobile({ locale: ['fr-FR'] })
      .optional(),
    anniversaire: vine
      .date({
        formats: ['DD/MM/YYYY', 'DD MM YYYY', 'DD-MM-YYYY'],
      })
      .optional(),
    dateInscription: vine
      .date({
        formats: ['DD/MM/YYYY', 'DD MM YYYY', 'DD-MM-YYYY'],
      })
      .optional(),
    isGuest: vine.boolean().optional(),
    clubId: vine.number().positive().withoutDecimals().optional().nullable(),
  })
)
