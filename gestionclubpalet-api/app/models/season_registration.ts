import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Season from './season.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Player from './player.js'

export default class SeasonRegistration extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare seasonId: number

  @column()
  declare playerId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
  @belongsTo(() => Season)
  declare season: BelongsTo<typeof Season>

  @belongsTo(() => Player)
  declare player: BelongsTo<typeof Player>
}
