import Day from '#models/day'
import type { HttpContext } from '@adonisjs/core/http'
import { ScoreStatus } from '../enums/score_status.js'

export default class DaysController {
  async index({ params }: HttpContext) {
    const days = await Day.query().where('season_id', params.seasonId).orderBy('index_jour', 'asc')

    return days
  }

  async store({ request, response }: HttpContext) {
    const { date, seasonId } = request.only(['date', 'seasonId'])

    // get last day
    const lastDay = await Day.query()
      .where('season_id', seasonId)
      .orderBy('index_jour', 'desc')
      .first()

    const indexJour = lastDay ? lastDay.indexJour + 1 : 1

    const day = await Day.create({
      seasonId: seasonId,
      indexJour,
      date,
      status: ScoreStatus.DRAFT,
      closed: false,
    })

    return response.created(day)
  }

  async show({ params }: HttpContext) {
    const day = await Day.query()
      .where('id', params.id)
      .preload('trainingScores', (query) => {
        query.preload('player')
      })
      .firstOrFail()
    return day
  }
}
