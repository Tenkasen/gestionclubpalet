import type { HttpContext } from '@adonisjs/core/http'
import SeasonRegistration from '#models/season_registration'
import Season from '#models/season'

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

  async show({ params }: HttpContext) {
    const registration = await SeasonRegistration.query()
      .preload('player')
      .preload('season')
      .where('season_id', params.seasonId)
      .where('player_id', params.playerId)
      .firstOrFail()

    return {
      player: registration.player,
      season: registration.season,
      registrationDate: registration.createdAt, // ou autres infos de l'inscription
    }
  }

  async update({ request, params, response }: HttpContext) {
    const registration = await SeasonRegistration.query()
      .where('season_id', params.seasonId)
      .where('player_id', params.playerId)
      .firstOrFail()
    const newSeasonId = request.input('seasonId')

    if (newSeasonId && Number(newSeasonId) !== Number(params.seasonId)) {
      const seasonId = Number(newSeasonId)
      if (Number.isNaN(seasonId)) {
        return response.badRequest({ error: 'seasonId doit être un nombre' })
      }
      await Season.findOrFail(newSeasonId)

      const existingRegistration = await SeasonRegistration.query()
        .where('season_id', seasonId)
        .where('player_id', params.playerId)
        .first()

      if (existingRegistration) {
        return response.conflict({
          error: 'Le joueur est déjà inscrit dans cette saison',
        })
      }

      registration.merge({ seasonId: seasonId })
      await registration.save()
    }
    await registration.load('season')
    await registration.load('player')
    return {
      message: 'Inscription modifiée avec succès',
      registration,
    }
  }

  async destroy({ params }: HttpContext) {
    const registration = await SeasonRegistration.query()
      .where('season_id', params.seasonId)
      .where('player_id', params.playerId)
      .firstOrFail()
    await registration.delete()
    return {
      message: 'Inscription supprimée avec succès',
      registration,
    }
  }
}
