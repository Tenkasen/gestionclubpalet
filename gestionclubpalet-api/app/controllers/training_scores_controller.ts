import Day from '#models/day'
import TrainingScore from '#models/training_score'
import { createTrainingScoreValidator } from '#validators/training_score'
import type { HttpContext } from '@adonisjs/core/http'

export default class TrainingScoresController {
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
    const scores = await TrainingScore.query().where('day_id', params.dayId).preload('player')
    return scores
  }

  async store({ request, params, response }: HttpContext) {
    const existingDay = await Day.query()
      .where('season_id', params.seasonId)
      .where('id', params.dayId)
      .first()

    if (!existingDay) {
      return response.notFound({
        message: `Cette journée n'existe pas dans cette saison`,
      })
    }
    const data = await request.validateUsing(createTrainingScoreValidator)

    const score = await TrainingScore.updateOrCreate(
      { dayId: params.dayId, playerId: data.playerId },
      { pointsPour: data.pointsPour, pointsContre: data.pointsContre }
    )
    return score
  }
}
