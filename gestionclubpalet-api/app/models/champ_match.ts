import { DateTime } from 'luxon'
import { BaseModel, beforeSave, belongsTo, column } from '@adonisjs/lucid/orm'
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

  // Calculate nbVictoire & goalAverage
  @beforeSave()
  static async calculateMatchStats(champScore: ChampScore) {
    champScore.totalPour =
      champScore.partie1Pour +
      champScore.partie2Pour +
      champScore.partie3Pour +
      champScore.partie4Pour +
      champScore.partie5Pour +
      champScore.partie6Pour

    champScore.totalContre =
      champScore.partie1Contre +
      champScore.partie2Contre +
      champScore.partie3Contre +
      champScore.partie4Contre +
      champScore.partie5Contre +
      champScore.partie6Contre

    champScore.goalAverage = champScore.totalPour - champScore.totalContre

    champScore.nbVictoire = 0
    if (champScore.partie1Pour > champScore.partie1Contre) champScore.nbVictoire++
    if (champScore.partie2Pour > champScore.partie2Contre) champScore.nbVictoire++
    if (champScore.partie3Pour > champScore.partie3Contre) champScore.nbVictoire++
    if (champScore.partie4Pour > champScore.partie4Contre) champScore.nbVictoire++
    if (champScore.partie5Pour > champScore.partie5Contre) champScore.nbVictoire++
    if (champScore.partie6Pour > champScore.partie6Contre) champScore.nbVictoire++
  }
}
