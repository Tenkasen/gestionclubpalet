import type { HttpContext } from '@adonisjs/core/http'
import Season from '#models/season'

export default class SeasonsController {
  async index({}: HttpContext) {
    const seasons = await Season.query().orderBy('date_debut', 'desc')
    return seasons
  }
}
