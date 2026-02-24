import type { HttpContext } from '@adonisjs/core/http'

import RankingService from '#services/ranking_services'
import Day from '#models/day'

export default class RankingsController {
  private rankingService = new RankingService()

  async dayRanking({ params }: HttpContext) {
    // get day to get seasonId
    const day = await Day.findOrFail(params.dayId)

    // call function with upToDay
    const ranking = await this.rankingService.getTrainingRanking(day.seasonId, params.dayId)

    return ranking
  }
  async seasonRanking({ params }: HttpContext) {
    // without upToDay, all the ranking
    const ranking = await this.rankingService.getTrainingRanking(params.seasonId)

    return ranking
  }
}
