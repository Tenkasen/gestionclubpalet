import type { HttpContext } from '@adonisjs/core/http'
import Season from '#models/season'
import { createSeasonValidator, updateSeasonValidator } from '#validators/season'

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

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createSeasonValidator)

    // check existing season name in the club
    const existingSeason = await Season.query()
      .where('nom', data.nom)
      .where('type', data.type)
      .first()

    if (existingSeason) {
      return response.conflict({
        message: `Une saison "${data.nom}" de type "${data.type}" existe déjà`,
        player: existingSeason,
      })
    }
    const season = await Season.create(data)
    return season
  }
  async show({ params }: HttpContext) {
    const season = await Season.query()
      .where('id', params.id)
      .preload('registrations', (query) => {
        query.preload('player')
      })
      .firstOrFail()
    return season
  }

  async update({ params, request }: HttpContext) {
    const season = await Season.findOrFail(params.id)
    const data = await request.validateUsing(updateSeasonValidator)
    season.merge(data)
    await season.save()
    return season
  }

  async destroy({ params }: HttpContext) {
    const season = await Season.findOrFail(params.id)
    await season.delete()
    return {
      message: 'Saison supprimée avec succès',
      season,
    }
  }
}
