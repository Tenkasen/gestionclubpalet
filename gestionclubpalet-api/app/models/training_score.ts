import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Day from './day.js'
import Player from './player.js'

export default class TrainingScore extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare dayId: number

  @column()
  declare playerId: number

  @column()
  declare pointsPour: number

  @column()
  declare pointsContre: number

  @column()
  declare goalAverage: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Day)
  declare day: BelongsTo<typeof Day>

  @belongsTo(() => Player)
  declare player: BelongsTo<typeof Player>
}
