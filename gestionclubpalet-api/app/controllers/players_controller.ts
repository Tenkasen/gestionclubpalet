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

  async store({ request }: HttpContext) {
    const data = request.only(['nom', 'prenom', 'isGuest', 'clubId'])
    const player = await Player.create(data)
    return player
  }
}
