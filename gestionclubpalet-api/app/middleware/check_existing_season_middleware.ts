import Season from '#models/season'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class CheckExistingSeason {
  async handle({ params, response, request }: HttpContext, next: NextFn) {
    //find season
    const season = await Season.find(params.seasonId)

    // if not found --> 404
    if (!season) {
      return response.notFound({
        message: 'Aucune saison ne correspond à cet ID',
        seasonId: params.seasonId,
      })
    }

    // Attach the season to the context to avoid repeating the query
    ;(request as any).season = season

    await next()
  }
}
