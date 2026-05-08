import ChampMatch from '#models/champ_match'
import TrainingScore from '#models/training_score'

interface RankingEntry {
  playerId: number
  nom: string
  prenom: string
  presences: number
  totalPour: number
  totalContre: number
  goalAverage: number
  nbVictoire?: number
  points: number
  position?: number
}
interface RankingEntry2 {
  playerId: number
  nom: string
  prenom: string
  presences: number
  totalPour: number
  totalContre: number
  goalAverage: number
  nbVictoire: number
  points: number
  position?: number
}

export default class RankingService {
  async getTrainingRanking(seasonId: number, upToDayId?: number) {
    // Step A : Get scores
    const scoresQuery = TrainingScore.query()
      .preload('player')
      .preload('day')
      .whereHas('day', (dayQuery) => {
        dayQuery.where('seasonId', seasonId)

        // If upToDayId is provided, filter as well through all the days up to now
        if (upToDayId) {
          dayQuery.where('id', '<=', upToDayId)
        }
      })

    const scores = await scoresQuery

    // Step B : Group scores by player
    const playersMap = new Map<number, RankingEntry>()

    for (const score of scores) {
      const playerId = score.playerId
      const player = score.player
      // if player does not exist in the map
      if (!playersMap.has(playerId)) {
        playersMap.set(playerId, {
          playerId,
          nom: player.nom,
          prenom: player.prenom,
          presences: 0,
          totalPour: 0,
          totalContre: 0,
          goalAverage: 0,
          points: 0,
        })
      }

      // get player entry
      const entry = playersMap.get(playerId)! // "!" cause we know it's not null or undefined

      // add points to this score
      entry.presences += 1
      entry.totalPour += score.pointsPour
      entry.totalContre += score.pointsContre
    }

    // Step C : Final ranking
    const ranking: RankingEntry[] = Array.from(playersMap.values()).map(
      // entry represents a player with all of their totals.
      (entry) => {
        entry.goalAverage = entry.totalPour - entry.totalContre
        entry.points = entry.totalPour
        return entry
      }
    )

    // Step D : sort the ranking
    ranking.sort((a, b) => {
      // 1. Sort by descending points
      if (b.points !== a.points) {
        return b.points - a.points
      }
      // 2. If tied, sort by goal average in descending order
      if (b.goalAverage !== a.goalAverage) {
        return b.goalAverage - a.goalAverage
      }
      // 3. If tied, sort by presences in ascending order
      if (b.presences !== a.presences) {
        return a.presences - b.presences
      }
      // 4. If still equal, sort alphabetically
      return a.nom.localeCompare(b.nom, 'fr')
    })

    // Step E : Add positions
    ranking.forEach((entry, index) => {
      entry.position = index + 1
    })

    return ranking
  }

  async getChampionshipRanking(seasonId: number, upToDayId?: number) {
    // Step A : Get scores
    const scoresQuery = ChampMatch.query()
      .preload('player')
      .preload('day')
      .whereHas('day', (dayQuery) => {
        dayQuery.where('seasonId', seasonId)

        // If upToDayId is provided, filter as well through all the days up to now
        if (upToDayId) {
          dayQuery.where('id', '<=', upToDayId)
        }
      })

    const scores = await scoresQuery

    // Step B : Group scores by player
    const playersMap = new Map<number, RankingEntry2>()

    for (const score of scores) {
      const playerId = score.playerId
      const player = score.player
      // if player does not exist in the map
      if (!playersMap.has(playerId)) {
        playersMap.set(playerId, {
          playerId,
          nom: player.nom,
          prenom: player.prenom,
          presences: 0,
          totalPour: 0,
          totalContre: 0,
          goalAverage: 0,
          nbVictoire: 0,
          points: 0,
        })
      }

      // get player entry
      const entry = playersMap.get(playerId)! // "!" cause we know it's not null or undefined

      // add points to this score
      entry.presences += 1
      entry.totalPour += score.totalPour
      entry.totalContre += score.totalContre
      entry.nbVictoire += score.nbVictoire
    }

    // Step C : Final ranking
    const ranking: RankingEntry[] = Array.from(playersMap.values()).map(
      // entry represents a player with all of their totals.
      (entry) => {
        entry.goalAverage = entry.totalPour - entry.totalContre
        entry.points = entry.totalPour
        entry.nbVictoire
        return entry
      }
    )

    // Step D : sort the ranking
    ranking.sort((a, b) => {
      // 1. Sort by descending points
      if (b.points !== a.points) {
        return b.points - a.points
      }
      // 2. If tied, sort by goal average in descending order
      if (b.goalAverage !== a.goalAverage) {
        return b.goalAverage - a.goalAverage
      }
      // 3. If tied, sort by victories in descending order
      if (b.nbVictoire !== a.nbVictoire) {
        return b.nbVictoire - a.nbVictoire
      }
      // 4. If tied, sort by presences in ascending order
      if (b.presences !== a.presences) {
        return a.presences - b.presences
      }
      // 5. If still equal, sort alphabetically
      return a.nom.localeCompare(b.nom, 'fr')
    })

    // Step E : Add positions
    ranking.forEach((entry, index) => {
      entry.position = index + 1
    })

    return ranking
  }
}
