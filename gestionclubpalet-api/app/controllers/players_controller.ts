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
        .preload('player', (query) => {
          query.orderBy('nom').orderBy('prenom')
        })
      return registrations.map((registration) => registration.player)
    }

    // Get all players sort by name
    return await Player.query().orderBy('nom').orderBy('prenom')
  }
}
