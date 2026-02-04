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
    const existingPlayer = await Player.query()
      .where('nom', data.nom)
      .where('prenom', data.prenom)
      .first()

    if (existingPlayer) {
      return response.conflict({
        message: 'Un joueur avec ce nom et prénom existe déjà',
        player: existingPlayer,
      })
    }
    const player = await Player.create(data)
    return {
      message: 'Joueur ajouté avec succès',
      player,
    }
  }

  async show({ params }: HttpContext) {
    const player = await Player.findOrFail(params.id)
    return player
  }

  async update({ params, request }: HttpContext) {
    const player = await Player.findOrFail(params.id)
    const data = await request.validateUsing(updatePlayerValidator)
    player.merge(data)
    await player.save()
    return {
      message: 'Joueur modifié avec succès',
      player,
    }
  }

  async destroy({ params }: HttpContext) {
    const player = await Player.findOrFail(params.id)
    await player.delete()
    return {
      message: 'Joueur supprimé avec succès',
      player,
    }
  }
}
