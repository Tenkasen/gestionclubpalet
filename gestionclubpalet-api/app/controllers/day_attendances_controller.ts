import DayAttendance from '#models/day_attendance'
import Player from '#models/player'
import { addPlayerInDayValidator } from '#validators/day_attendance'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class DayAttendancesController {
  async index({ params }: HttpContext) {
    // Get one day registration
    const registrations = await DayAttendance.query()
      .where('index_jour', params.dayIndex)
      //load associated players
      .preload('player')
      .preload('day')

    if (registrations.length === 0) {
      return {
        message: 'Aucun joueur inscrit pour cette journée',
        playersList: [],
      }
    }
    const players = registrations.map((register) => register.player)
    const day = registrations[0].day
    // Sort players
    const playersList = [...players].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
    return {
      message: `Liste des joueurs de la journée "${day?.indexJour}"`,
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

    // check existing player in this season
    const existingRegistrations = await DayAttendance.query()
      .where('index_jour', params.dayIndex)
      .whereIn('player_id', playerIds)

    if (existingRegistrations.length > 0) {
      return response.conflict({
        message: 'Un des joueurs est déjà inscrit pour cette journée',
        playersRegister: existingRegistrations,
      })
    }

    const registrations = await DayAttendance.createMany(
      playerIds.map((id) => ({ dayIndex: params.dayIndex, playerId: id }))
    )

    for (const regi of registrations) {
      await regi.load('player')
    }
    return response.created(registrations)
  }

  async destroy({ params }: HttpContext) {
    const registration = await DayAttendance.query()
      .where('index_jour', params.dayIndex)
      .where('player_id', params.playerId)
      .firstOrFail()
    await registration.delete()
    return {
      message: 'Inscription supprimée avec succès',
      registration,
    }
  }
}
