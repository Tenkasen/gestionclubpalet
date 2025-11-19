import Season from '#models/season'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { SeasonType } from '../../app/enums/season_type.js'

export default class extends BaseSeeder {
  async run() {
    await Season.createMany([
      { nom: 'Saison 2025-2026', type: SeasonType.ENTRAINEMENT, dateDebut: new Date('2025-08-22') },
      { nom: 'Saison 2025-2026', type: SeasonType.CHAMPIONNAT, dateDebut: new Date('2025-09-05') },
      { nom: 'Saison 2025-2026', type: SeasonType.COUPE, dateDebut: new Date('2025-10-10') },
    ])
  }
}
