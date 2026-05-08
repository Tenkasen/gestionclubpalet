import SeasonRegistration from '#models/season_registration'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class SeasonRegistrationSeeder extends BaseSeeder {
  async run() {
    const seasonRegistrations = []

    // 2024-2025 season
    // ENTRAINEMENT 2024-2025 (seasonId: 1) -
    const entrainement2024PlayerIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

    // CHAMPIONNAT 2024-2025 (seasonId: 2) - 49 joueurs
    const championnat2024PlayerIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    // COUPE 2024-2025 (seasonId: 3) - Mêmes joueurs que championnat
    const coupe2024PlayerIds = championnat2024PlayerIds

    // SAISON 2025-2026
    // ENTRAINEMENT 2025-2026 (seasonId: 4) - 52 joueurs
    const entrainement2025PlayerIds = [7, 9, 10, 15]

    // CHAMPIONNAT 2025-2026 (seasonId: 5) - 46 joueurs
    const championnat2025PlayerIds = [5, 9, 10, 13]

    // COUPE 2025-2026 (seasonId: 6) - Mêmes joueurs que championnat
    const coupe2025PlayerIds = championnat2025PlayerIds

    // Générer les inscriptions pour 2024-2025
    for (const playerId of entrainement2024PlayerIds) {
      seasonRegistrations.push({ seasonId: 1, playerId })
    }
    for (const playerId of championnat2024PlayerIds) {
      seasonRegistrations.push({ seasonId: 2, playerId })
    }
    for (const playerId of coupe2024PlayerIds) {
      seasonRegistrations.push({ seasonId: 3, playerId })
    }

    // Générer les inscriptions pour 2025-2026
    for (const playerId of entrainement2025PlayerIds) {
      seasonRegistrations.push({ seasonId: 4, playerId })
    }
    for (const playerId of championnat2025PlayerIds) {
      seasonRegistrations.push({ seasonId: 5, playerId })
    }
    for (const playerId of coupe2025PlayerIds) {
      seasonRegistrations.push({ seasonId: 6, playerId })
    }

    await SeasonRegistration.updateOrCreateMany(['seasonId', 'playerId'], seasonRegistrations)
  }
}
