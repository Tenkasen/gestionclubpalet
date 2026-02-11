import Day from '#models/day'
import type { HttpContext } from '@adonisjs/core/http'

export default class DaysController {
  async index({ params }: HttpContext) {
    const days = await Day.query().where('season_id', params.seasonId).orderBy('index_jour', 'asc')
    return days
  }

  async store({ request }) {
    const { date } = request.only(['date'])

    // get last day
    const lastDay = await Day.query()
  }
}
