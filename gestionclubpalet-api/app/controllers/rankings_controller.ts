import type { HttpContext } from '@adonisjs/core/http'

import RankingService from '#services/ranking_services'
import Day from '#models/day'
// import Day from '#models/day'

export default class RankingsController {
  private rankingService = new RankingService()

  async dayRanking({ params, response }: HttpContext) {
    const existingDay = await Day.query()
      .where('season_id', params.seasonId)
      .where('id', params.dayId)
      .first()

    if (!existingDay) {
      return response.notFound({
        message: `Cette journée n'existe pas dans cette saison`,
      })
    }
    // call function with upToDay
    const ranking = await this.rankingService.getTrainingRanking(params.seasonId, params.dayId)

    return ranking
  }
  async seasonRanking({ params }: HttpContext) {
    // without upToDay, all the ranking
    const ranking = await this.rankingService.getTrainingRanking(params.seasonId)

    return ranking
  }
}
