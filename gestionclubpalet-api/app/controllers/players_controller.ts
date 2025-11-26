import Player from '#models/player'
import SeasonRegistration from '#models/season_registration'
import type { HttpContext } from '@adonisjs/core/http'
import { error } from 'console'

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

  async store({ request }: HttpContext) {
    const data = request.only(['nom', 'prenom', 'isGuest', 'clubId'])
    const player = await Player.create(data)
    return player
  }

  async register({ params, request, response }: HttpContext) {
    const { playerId } = request.only(['playerId'])

    // check existing user
    const existingPlayer = await SeasonRegistration.query()
      .where('seasonId', params.seasonId)
      .where('playerId', playerId)
      .first()

    if (existingPlayer) {
      return response.conflict({ error: 'Ce joueur est déjà inscrit pour cette saison' })
    }

    const registration = await SeasonRegistration.create({
      seasonId: params.seasonId,
      playerId: playerId,
    })

    await registration.load('player')
    return response.created(registration)
  }
}
