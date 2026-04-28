import type { HttpContext } from '@adonisjs/core/http'
import SeasonRegistration from '#models/season_registration'
import Season from '#models/season'
import Player from '#models/player'
import vine from '@vinejs/vine'
import { addPlayerInSeasonValidator } from '#validators/season_registration'

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
    const playerIds = await vine.validate({
      schema: addPlayerInSeasonValidator,
      data: request.body(),
    })

    const existingPlayers = await Player.query().whereIn('id', playerIds)

    const notFoundIds = playerIds.filter(
      (id) => !existingPlayers.some((player) => player.id === id)
    )
    if (existingPlayers.length !== playerIds.length) {
      return response.conflict({
        message: "Un des joueurs n'existe pas",
        notExistingPlayers: notFoundIds,
      })
    }

    // check existing player in this season
    const existingRegistrations = await SeasonRegistration.query()
      .where('season_id', params.seasonId)
      .whereIn('player_id', playerIds)

    if (existingRegistrations.length > 0) {
      return response.conflict({
        message: 'Un des joueurs est déjà inscrit pour cette saison',
        playersRegister: existingRegistrations,
      })
    }

    const registrations = await SeasonRegistration.createMany(
      playerIds.map((id) => ({ seasonId: params.seasonId, playerId: id }))
    )

    for (const regi of registrations) {
      await regi.load('player')
    }
    return response.created(registrations)
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
    const existingPlayer = await Player.find(params.playerId)

    if (!existingPlayer) {
      return response.notFound({
        message: 'Aucun joueur ne correspond à cet ID',
      })
    }
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
