import vine from '@vinejs/vine'
import { SeasonType } from '../enums/season_type.js'

export const createSeasonValidator = vine.compile(
  vine.object({
    nom: vine.string().trim().minLength(9).maxLength(100),
    type: vine.enum(SeasonType),
    dateDebut: vine.date(),
    dateFin: vine.date().nullable().optional(),
    ClubId: vine.number().positive().withoutDecimals().optional().nullable(),
  })
)

export const updateSeasonValidator = vine.compile(
  vine.object({
    nom: vine.string().trim().minLength(9).maxLength(100).optional(),
    type: vine.enum(SeasonType).optional(),
    dateDebut: vine.date().optional(),
    dateFin: vine.date().optional().nullable(),
    clubId: vine.number().positive().withoutDecimals().optional().nullable(),
  })
)
