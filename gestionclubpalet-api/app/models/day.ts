import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { ScoreStatus } from '../enums/score_status.js'
import Season from './season.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import TrainingScore from './training_score.js'
import ChampMatch from './champ_match.js'

export default class Day extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare seasonId: number

  @column()
  declare indexJour: number

  @column()
  declare date: Date

  @column()
  status: ScoreStatus = ScoreStatus.DRAFT

  @column()
  closed: boolean = false

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
  @belongsTo(() => Season)
  declare season: BelongsTo<typeof Season>

  @hasMany(() => TrainingScore)
  declare trainingScores: HasMany<typeof TrainingScore>

  @hasMany(() => ChampMatch)
  declare champMatches: HasMany<typeof ChampMatch>
}
