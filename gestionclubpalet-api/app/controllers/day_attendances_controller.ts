import Day from '#models/day'
import DayAttendance from '#models/day_attendance'
import Player from '#models/player'
import { addPlayerInDayValidator } from '#validators/day_attendance'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class DayAttendancesController {
  async index({ params, response }: HttpContext) {
    const existingDay = await Day.query()
      .where('season_id', params.seasonId)
      .where('index_jour', params.dayIndex)
      .first()

    if (!existingDay) {
      return response.notFound({
        message: `Cette journée n'existe pas dans cette saison`,
      })
    }

    // Get one day registration
    const registrations = await DayAttendance.query()
      .where('day_id', existingDay.id)
      //load associated players
      .preload('player')

    if (registrations.length === 0) {
      return {
        message: 'Aucun joueur inscrit pour cette journée',
        playersList: [],
      }
    }
    const players = registrations.map((register) => register.player)
    // Sort players
    const playersList = [...players].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
    return {
      message: `Liste des joueurs de la journée "${existingDay.indexJour}"`,
      playersList,
    }
  }

  // Register a player in a specific day
  async store({ params, request, response }: HttpContext) {
    const playerIds = await vine.validate({
      schema: addPlayerInDayValidator,
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

    const existingDay = await Day.query()
      .where('season_id', params.seasonId)
      .where('index_jour', params.dayIndex)
      .first()

    if (!existingDay) {
      return response.notFound({
        message: `Cette journée n'existe pas dans cette saison`,
      })
    }

    // check existing player in this season
    const existingRegistrations = await DayAttendance.query()
      .where('day_id', existingDay.id)
      .whereIn('player_id', playerIds)

    if (existingRegistrations.length > 0) {
      return response.conflict({
        message: 'Un des joueurs est déjà inscrit pour cette journée',
        playersRegister: existingRegistrations,
      })
    }

    const registrations = await DayAttendance.createMany(
      playerIds.map((id) => ({ dayId: existingDay.id, playerId: id }))
    )

    for (const regi of registrations) {
      await regi.load('player')
    }
    return response.created(registrations)
  }

  async destroy({ params, response }: HttpContext) {
    const existingDay = await Day.query()
      .where('season_id', params.seasonId)
      .where('index_jour', params.dayIndex)
      .first()

    if (!existingDay) {
      return response.notFound({
        message: `Cette journée n'existe pas dans cette saison`,
      })
    }
    const registration = await DayAttendance.query()
      .where('day_id', existingDay.id)
      .where('player_id', params.playerId)
      .firstOrFail()
    await registration.delete()
    return {
      message: 'Inscription supprimée avec succès',
      registration,
    }
  }
}
