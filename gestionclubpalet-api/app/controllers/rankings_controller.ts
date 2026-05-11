import type { HttpContext } from '@adonisjs/core/http'

import RankingService from '#services/ranking_services'
import Day from '#models/day'
import Season from '#models/season'
// import Day from '#models/day'

export default class RankingsController {
  private rankingService = new RankingService()

  async dayRanking({ params, response }: HttpContext) {
    const existingDay = await Day.query()
      .where('season_id', params.seasonId)
      .where('index_jour', params.dayIndex)
      .first()

    if (!existingDay) {
      return response.notFound({
        message: `Cette journée n'existe pas dans cette saison`,
      })
    }

    const season = await Season.findOrFail(params.seasonId)

    if (season.type === 'ENTRAINEMENT') {
      // call function with upToDay
      return await this.rankingService.getTrainingRanking(params.seasonId, existingDay.id)
    } else {
      return await this.rankingService.getChampionshipRanking(params.seasonId, existingDay.id)
    }
  }
  async seasonRanking({ params }: HttpContext) {
    const season = await Season.findOrFail(params.seasonId)
    // without upToDay, all the ranking
    if (season.type === 'ENTRAINEMENT') {
      return await this.rankingService.getTrainingRanking(params.seasonId)
    } else {
      return await this.rankingService.getChampionshipRanking(params.seasonId)
    }
  }
}
