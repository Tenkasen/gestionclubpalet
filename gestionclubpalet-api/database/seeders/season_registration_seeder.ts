import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const seasonRegistrations = []

    // 2024-2025 season
    // ENTRAINEMENT 2024-2025 (seasonId: 1) - 54 joueurs
    const entrainement2024PlayerIds = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 50, 51,
      52, 53, 54, 57, 58,
    ]

    // CHAMPIONNAT 2024-2025 (seasonId: 2) - 49 joueurs
    const championnat2024PlayerIds = [
      1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 61,
      62,
    ]
    // COUPE 2024-2025 (seasonId: 3) - Mêmes joueurs que championnat
    const coupe2024PlayerIds = championnat2024PlayerIds

    // SAISON 2025-2026
    // ENTRAINEMENT 2025-2026 (seasonId: 4) - 52 joueurs
    const entrainement2025PlayerIds = [
      1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 50, 51, 54,
      55, 59, 60, 63,
    ]

    // CHAMPIONNAT 2025-2026 (seasonId: 5) - 46 joueurs
    const championnat2025PlayerIds = [
      1, 2, 3, 4, 5, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      28, 30, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 60, 62, 63, 64,
    ]

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
  }
}
