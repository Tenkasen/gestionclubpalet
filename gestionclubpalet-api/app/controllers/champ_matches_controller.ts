import ChampMatch from '#models/champ_match'
import Day from '#models/day'
import { createChampMatchesValidator } from '#validators/champ_match'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChampMatchesController {
  async index({ params, response }: HttpContext) {
    const existingDay = await Day.query()
      .where('season_id', params.seasonId)
      .where('index_jour', params.dayNumber)
      .first()

    if (!existingDay) {
      return response.notFound({
        message: `Cette journée n'existe pas dans cette saison`,
      })
    }

    const matchScores = await ChampMatch.query().where('day_id', existingDay.id).preload('player')
    return matchScores
  }

  async store({ params, response, request }: HttpContext) {
    const existingDay = await Day.query()
      .where('season_id', params.seasonId)
      .where('index_jour', params.dayNumber)
      .first()

    if (!existingDay) {
      return response.notFound({
        message: `Cette journée n'existe pas dans cette saison`,
      })
    }

    const data = await request.validateUsing(createChampMatchesValidator)
    const matchData = {
      partie1Pour: data.parties[0].pointsPour,
      partie1Contre: data.parties[0].pointsContre,
      partie2Pour: data.parties[1].pointsPour,
      partie2Contre: data.parties[1].pointsContre,
      partie3Pour: data.parties[2].pointsPour,
      partie3Contre: data.parties[2].pointsContre,
      partie4Pour: data.parties[3].pointsPour,
      partie4Contre: data.parties[3].pointsContre,
      partie5Pour: data.parties[4].pointsPour,
      partie5Contre: data.parties[4].pointsContre,
      partie6Pour: data.parties[5].pointsPour,
      partie6Contre: data.parties[5].pointsContre,
    }

    const score = await ChampMatch.updateOrCreate(
      { dayId: existingDay.id, playerId: data.playerId },
      matchData
    )
    await score.load('player')
    return score
  }
}
