import ChampMatch from '#models/champ_match'
import Day from '#models/day'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChampMatchesController {
  async index({ params, response }: HttpContext) {
    const existingDay = await Day.query()
      .where('season_id', params.seasonId)
      .where('id', params.dayId)
      .first()

    if (!existingDay) {
      return response.notFound({
        message: `Cette journée n'existe pas dans cette saison`,
      })
    }

    const matchScores = await ChampMatch.query().where('day_id', params.dayId).preload('player')
    return matchScores
  }
}
