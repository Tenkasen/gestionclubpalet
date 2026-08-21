import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Day from './day.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Player from './player.js'

export default class DayAttendance extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare dayId: number

  @column()
  declare playerId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
  @belongsTo(() => Day)
  declare day: BelongsTo<typeof Day>

  @belongsTo(() => Player)
  declare player: BelongsTo<typeof Player>
}
