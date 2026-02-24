import type { HttpContext } from '@adonisjs/core/http'

import RankingService from '#services/ranking_services'
// import Day from '#models/day'

export default class RankingsController {
  private rankingService = new RankingService()

  async dayRanking({ params }: HttpContext) {
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
