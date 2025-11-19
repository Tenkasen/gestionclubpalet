import type { HttpContext } from '@adonisjs/core/http'
import Season from '#models/season'

export default class SeasonsController {
  async index({ request }: HttpContext) {
    const type = request.qs().type
    const query = Season.query().orderBy('date_debut', 'desc')

    if (type) {
      query.where('type', type)
    }

    const seasons = await query
    return seasons
  }

  async store({ request }: HttpContext) {
    const data = request.only(['nom', 'type', 'dateDebut', 'dateFin', 'clubId'])
    const season = await Season.create(data)
    return season
  }
  async show({ params }: HttpContext) {
    const season = await Season.findOrFail(params.id)
    return season
  }
  async update({ params, request }: HttpContext) {
    const season = await Season.findOrFail(params.id)
    const data = request.only(['nom', 'type', 'dateDebut', 'dateFin', 'clubId'])
    season.merge(data)
    await season.save()
    return season
  }
}
