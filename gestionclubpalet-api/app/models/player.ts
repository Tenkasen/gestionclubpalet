import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import SeasonRegistration from './season_registration.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Player extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nom: string

  @column()
  declare prenom: string

  @column()
  declare isGuest: boolean = false

  @column()
  declare clubId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
  @hasMany(() => SeasonRegistration)
  declare registrations: HasMany<typeof SeasonRegistration>
}
