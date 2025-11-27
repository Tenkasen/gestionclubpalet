import Player from '#models/player'
import SeasonRegistration from '#models/season_registration'
import type { HttpContext } from '@adonisjs/core/http'

export default class PlayersController {
  async index({ request }: HttpContext) {
    const seasonId = request.qs().seasonId

    if (seasonId) {
      // Get one season registration
      const registrations = await SeasonRegistration.query()
        .where('season_id', seasonId)
        //load associated players
        .preload('player')
      const players = registrations.map((register) => register.player)

      // Sort players
      return players.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
    }

    // Get all players sort by name
    return await Player.query().orderBy('nom').orderBy('prenom')
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nom', 'prenom', 'isGuest', 'clubId'])

    // check existing user
    const existingPlayer = await Player.query()
      .where('nom', data.nom)
      .where('prenom', data.prenom)
      .first()

    if (existingPlayer) {
      return response.conflict({
        message: 'Un joueur avec ce nom et prénom existe déjà',
        player: existingPlayer,
      })
    }
    const player = await Player.create(data)
    return player
  }

  // Register a player in a specific season
  async register({ params, request, response }: HttpContext) {
    const { playerId } = request.only(['playerId'])

    // check existing user
    const existingPlayer = await SeasonRegistration.query()
      .where('seasonId', params.seasonId)
      .where('playerId', playerId)
      .first()

    if (existingPlayer) {
      return response.conflict({ message: 'Ce joueur est déjà inscrit pour cette saison' })
    }

    const registration = await SeasonRegistration.create({
      seasonId: params.seasonId,
      playerId: playerId,
    })

    await registration.load('player')
    return response.created(registration)
  }
}
