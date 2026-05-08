import Player from '#models/player'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

const dateInscription = new Date('2016-06-19')

export default class PlayerSeeder extends BaseSeeder {
  async run() {
    await Player.createMany([
      { nom: 'CHOUIN', prenom: 'Teddy', dateInscription: dateInscription },
      { nom: 'BOURDET', prenom: 'Fabien', dateInscription: dateInscription },
      { nom: 'ROBIN', prenom: 'Ludovic', dateInscription: dateInscription },
      { nom: 'GUILLOTEAU', prenom: 'David', dateInscription: dateInscription },
      { nom: 'VERGNE', prenom: 'Jérôme', dateInscription: dateInscription },
      { nom: 'GIRAUDET', prenom: 'Damien', dateInscription: dateInscription },
      { nom: 'REMAUD', prenom: 'Brice', dateInscription: dateInscription },
      { nom: 'MOREAU', prenom: 'Yann', dateInscription: dateInscription },
      { nom: 'GUILLOTEAU', prenom: 'Kévin', dateInscription: dateInscription },
      { nom: 'BOURDET', prenom: 'Mickaël', dateInscription: dateInscription },
      { nom: 'PADIOLLEAU', prenom: 'Romain', dateInscription: dateInscription },
      { nom: 'BAUDRY', prenom: 'Ghislain', dateInscription: dateInscription },
      { nom: "PROD'HOMME", prenom: 'Hugo', dateInscription: dateInscription },
      { nom: 'RONDEAU', prenom: 'Olivier', dateInscription: dateInscription },
      { nom: 'GUITTONEAU', prenom: 'Cédric', dateInscription: dateInscription },
      { nom: 'MERCERON', prenom: 'Sacha', dateInscription: new Date('2025-09-19') },
      { nom: 'NAULLEAU', prenom: 'Enzo', dateInscription: new Date('2025-08-22') },
      { nom: 'NAULLEAU', prenom: 'Hugo', dateInscription: new Date('2025-08-22') },
      { nom: 'THOMAS', prenom: 'Christophe', dateInscription: new Date('2025-10-14') },
      { nom: 'ZIMMERMANN', prenom: 'Tom', dateInscription: new Date('2025-09-19') },
    ])
  }
}
