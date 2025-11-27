import type { HttpContext } from '@adonisjs/core/http'
import SeasonRegistration from '#models/season_registration'

export default class SeasonRegistrationsController {
  async index({ request }: HttpContext) {}

  // Register a player in a specific season
  async store({ params, request, response }: HttpContext) {
    const { playerId } = request.only(['playerId'])

    // check existing player in this season
    const existingPlayer = await SeasonRegistration.query()
      .where('seasonId', params.seasonId)
      .where('playerId', playerId)
      .first()

    if (existingPlayer) {
      return response.conflict({
        message: 'Ce joueur est déjà inscrit pour cette saison',
      })
    }

    const registration = await SeasonRegistration.create({
      seasonId: params.seasonId,
      playerId: playerId,
    })

    await registration.load('player')
    return response.created(registration)
  }

  async show({ request, params }: HttpContext) {}

  async update({ request, params }: HttpContext) {}

  async destroy({ request, params }: HttpContext) {}
}
