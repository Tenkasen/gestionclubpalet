import Player from '#models/player'
import { createPlayerValidator, updatePlayerValidator } from '#validators/player'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class PlayersController {
  async index({}: HttpContext) {
    return await Player.query().orderBy('nom').orderBy('prenom')
  }

  async store({ request, response }: HttpContext) {
    const data = await vine.validate({
      schema: createPlayerValidator,
      data: request.body(),
    })

    // check existing player in the club
    const existingPlayers = await Player.query().where((query) => {
      for (const player of data) {
        query.orWhere((q) => q.where('nom', player.nom).where('prenom', player.prenom))
      }
    })

    if (existingPlayers.length > 0) {
      return response.conflict({
        message: 'Un joueur avec ce nom et prénom existe déjà',
        players: existingPlayers,
      })
    }

    const players = await Player.createMany(data)
    return {
      message: 'Joueur(s) ajouté(s) avec succès',
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
