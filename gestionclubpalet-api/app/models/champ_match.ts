import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Day from './day.js'
import Player from './player.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ChampMatch extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare dayId: number

  @column()
  declare playerId: number

  @column()
  declare partie1Pour: number

  @column()
  declare partie1Contre: number

  @column()
  declare partie2Pour: number

  @column()
  declare partie2Contre: number

  @column()
  declare partie3Pour: number

  @column()
  declare partie3Contre: number

  @column()
  declare partie4Pour: number

  @column()
  declare partie4Contre: number

  @column()
  declare partie5Pour: number

  @column()
  declare partie5Contre: number

  @column()
  declare partie6Pour: number

  @column()
  declare partie6Contre: number

  @column()
  declare totalPour: number

  @column()
  declare totalContre: number

  @column()
  declare nbVictoire: number

  @column()
  declare goalAverage: number

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
