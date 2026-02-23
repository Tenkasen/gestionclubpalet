import TrainingScore from '#models/training_score'
import { createTrainingScoreValidator } from '#validators/training_score'
import type { HttpContext } from '@adonisjs/core/http'

export default class TrainingScoresController {
  async index({ params }: HttpContext) {
    const scores = await TrainingScore.query().where('day_id', params.dayId).preload('player')
    return scores
  }

  async store({ request, params }: HttpContext) {
    const data = await request.validateUsing(createTrainingScoreValidator)

    const score = await TrainingScore.updateOrCreate(
      { dayId: params.dayId, playerId: data.playerId },
      { pointsPour: data.pointsPour, pointsContre: data.pointsContre }
    )
    return score
  }
}
