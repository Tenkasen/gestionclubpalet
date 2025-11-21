import Season from '#models/season'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { SeasonType } from '../../app/enums/season_type.js'

export default class extends BaseSeeder {
  async run() {
    await Season.createMany([
      {
        nom: 'Saison 2024-2025',
        type: SeasonType.ENTRAINEMENT,
        dateDebut: new Date('2024-08-16'), // 3ème vendredi d'août 2024
        dateFin: new Date('2025-04-11'), // 2ème vendredi d'avril 2025
      },
      {
        nom: 'Saison 2024-2025',
        type: SeasonType.CHAMPIONNAT,
        dateDebut: new Date('2024-09-06'), // 1er vendredi de septembre 2024
        dateFin: new Date('2025-03-14'), // 2ème vendredi de mars 2025
      },
      {
        nom: 'Saison 2024-2025',
        type: SeasonType.COUPE,
        dateDebut: new Date('2024-10-04'), // 1er vendredi d'octobre 2024
        dateFin: new Date('2025-01-31'), // Dernier vendredi de janvier 2025
      },
      {
        nom: 'Saison 2025-2026',
        type: SeasonType.ENTRAINEMENT,
        dateDebut: new Date('2025-08-15'), // 3ème vendredi d'août 2025
        dateFin: new Date('2026-04-10'), // 2ème vendredi d'avril 2026
      },
      {
        nom: 'Saison 2025-2026',
        type: SeasonType.CHAMPIONNAT,
        dateDebut: new Date('2025-09-05'), // 1er vendredi de septembre 2025
        dateFin: new Date('2026-03-13'), // 2ème vendredi de mars 2026
      },
      {
        nom: 'Saison 2025-2026',
        type: SeasonType.COUPE,
        dateDebut: new Date('2025-10-03'), // 1er vendredi d'octobre 2025
        dateFin: new Date('2026-01-30'), // Dernier vendredi de janvier 2026
      },
      {
        nom: 'Saison 2023-2024',
        type: SeasonType.ENTRAINEMENT,
        dateDebut: new Date('2023-08-18'), // 3ème vendredi d'août 2023
        dateFin: new Date('2024-04-12'), // 2ème vendredi d'avril 2024
      },
      {
        nom: 'Saison 2023-2024',
        type: SeasonType.CHAMPIONNAT,
        dateDebut: new Date('2023-09-01'), // 1er vendredi de septembre 2023
        dateFin: new Date('2024-03-08'), // 2ème vendredi de mars 2024
      },
      {
        nom: 'Saison 2023-2024',
        type: SeasonType.COUPE,
        dateDebut: new Date('2023-10-06'), // 1er vendredi d'octobre 2023
        dateFin: new Date('2024-01-26'), // Dernier vendredi de janvier 2024
      },
    ])
  }
}
