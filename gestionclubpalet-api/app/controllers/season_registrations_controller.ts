import type { HttpContext } from '@adonisjs/core/http'
import SeasonRegistration from '#models/season_registration'

export default class SeasonRegistrationsController {
  async index({ params }: HttpContext) {
    // Get one season registration
    const registrations = await SeasonRegistration.query()
      .where('season_id', params.seasonId)
      //load associated players
      .preload('player')
      .preload('season')

    if (registrations.length === 0) {
      return {
        message: 'Aucun joueur inscrit pour cette saison',
        playersList: [],
      }
    }
    const players = registrations.map((register) => register.player)
    const season = registrations[0].season
    const playersList = players.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
    // Sort players
    return {
      message: `Liste des joueurs de la saison "${season?.nom} - ${season?.type}"`,
      playersList,
    }
  }

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
