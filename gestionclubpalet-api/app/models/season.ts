import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { SeasonType } from '../enums/season_type.js'
import SeasonRegistration from './season_registration.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Day from './day.js'

export default class Season extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nom: string

  @column()
  declare type: SeasonType

  @column()
  declare dateDebut: DateTime

  @column()
  declare dateFin: DateTime | null

  @column()
  declare clubId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
  @hasMany(() => SeasonRegistration)
  declare registrations: HasMany<typeof SeasonRegistration>

  @hasMany(() => Day)
  declare days: HasMany<typeof Day>
}
