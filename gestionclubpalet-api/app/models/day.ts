import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { ScoreStatus } from '../enums/score_status.js'
import Season from './season.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Day extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare seasonId: number

  @column()
  declare indexJour: number

  @column()
  declare date: DateTime

  @column()
  status: ScoreStatus = ScoreStatus.DRAFT

  @column()
  closed: boolean = false

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Season)
  declare season: BelongsTo<typeof Season>
}
