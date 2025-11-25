import Player from '#models/player'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class PlayerSeeder extends BaseSeeder {
  async run() {
    await Player.createMany([
      { nom: 'CHOUIN', prenom: 'Teddy' },
      { nom: 'BOURDET', prenom: 'Fabien' },
      { nom: 'ROBIN', prenom: 'Ludovic' },
      { nom: 'GUILLOTEAU', prenom: 'David' },
      { nom: 'VERGNE', prenom: 'Jérôme' },
      { nom: 'GIRAUDET', prenom: 'Damien' },
      { nom: 'REMAUD', prenom: 'Brice' },
      { nom: 'MOREAU', prenom: 'Yann' },
      { nom: 'GUILLOTEAU', prenom: 'Kévin' },
      { nom: 'BOURDET', prenom: 'Mickaël' },
      { nom: 'PADIOLLEAU', prenom: 'Romain' },
      { nom: 'BAUDRY', prenom: 'Ghislain' },
      { nom: 'MERCERON', prenom: 'Sacha' },
      { nom: 'NAULLEAU', prenom: 'Enzo' },
      { nom: 'NAULLEAU', prenom: 'Hugo' },
      { nom: 'THOMAS', prenom: 'Christophe' },
      { nom: 'ZIMMERMANN', prenom: 'Tom' },
    ])
  }
}
