import TrainingScore from '#models/training_score'
import type { HttpContext } from '@adonisjs/core/http'

export default class TrainingScoresController {
  async index({ params }: HttpContext) {
    const scores = await TrainingScore.query().where('day_id', params.dayId).preload('player')
    return scores
  }

  async store({ request, params }: HttpContext) {
    const { playerId, pointsPour, pointsContre } = request.only([
      'playerId',
      'pointsPour',
      'pointsContre',
    ])

    const score = await TrainingScore.updateOrCreate(
      { dayId: params.dayId, playerId },
      { pointsPour, pointsContre }
    )
    return score
  }
}
