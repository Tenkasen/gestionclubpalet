import Day from '#models/day'
import type { HttpContext } from '@adonisjs/core/http'
import { ScoreStatus } from '../enums/score_status.js'
import { createDayValidator } from '#validators/day'

export default class DaysController {
  async index({ params }: HttpContext) {
    const days = await Day.query().where('season_id', params.seasonId).orderBy('index_jour', 'asc')

    return days
  }

  async store({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(createDayValidator)

    // get last day
    const lastDay = await Day.query()
      .where('season_id', params.seasonId)
      .orderBy('index_jour', 'desc')
      .first()

    const indexJour = lastDay ? lastDay.indexJour + 1 : 1

    const day = await Day.create({
      seasonId: params.seasonId,
      indexJour,
      date: data.date,
      status: ScoreStatus.DRAFT,
      closed: false,
    })

    return response.created(day)
  }

  async show({ params }: HttpContext) {
    const day = await Day.query()
      .where('id', params.dayId)
      .preload('trainingScores', (query) => {
        query.preload('player')
      })
      .firstOrFail()
    return day
  }
}
