import Player from '#models/player'
import { createPlayerValidator, updatePlayerValidator } from '#validators/player'
import type { HttpContext } from '@adonisjs/core/http'

export default class PlayersController {
  async index({}: HttpContext) {
    return await Player.query().orderBy('nom').orderBy('prenom')
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createPlayerValidator)

    // check existing player in the club
    const existingPlayers = await Player.query().where('nom', data.nom).where('prenom', data.prenom)

    if (existingPlayers.length > 0) {
      return response.conflict({
        message: 'Un joueur avec ce nom et prénom existe déjà',
        players: existingPlayers,
      })
    }

    const players = await Player.create({
      ...data,
      dateInscription: data.dateInscription ?? new Date(),
    })
    return {
      message: 'Joueur ajouté avec succès',
      players,
    }
  }

  async show({ params }: HttpContext) {
    const player = await Player.findOrFail(params.playerId)
    return player
  }

  async update({ params, request }: HttpContext) {
    const player = await Player.findOrFail(params.playerId)
    const data = await request.validateUsing(updatePlayerValidator)
    player.merge(data)
    await player.save()
    return {
      message: 'Joueur modifié avec succès',
      player,
    }
  }

  async destroy({ params }: HttpContext) {
    const player = await Player.findOrFail(params.playerId)
    await player.delete()
    return {
      message: 'Joueur supprimé avec succès',
      player,
    }
  }
}
