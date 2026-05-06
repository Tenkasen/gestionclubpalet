/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RankingsController = () => import('#controllers/rankings_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ChampMatchesController = () => import('#controllers/champ_matches_controller')
const PlayersController = () => import('#controllers/players_controller')
const SeasonsController = () => import('#controllers/seasons_controller')
const SeasonRegistrationsController = () => import('#controllers/season_registrations_controller')
const DaysController = () => import('#controllers/days_controller')
const TrainingScoresController = () => import('#controllers/training_scores_controller')

router.get('/', async () => {
  return {
    message: 'API is running',
  }
})

// Seasons Routes
router.get('/seasons', [SeasonsController, 'index'])
router.post('/seasons', [SeasonsController, 'store'])
router.get('/seasons/:seasonId', [SeasonsController, 'show'])
router.patch('/seasons/:seasonId', [SeasonsController, 'update'])
router.delete('/seasons/:seasonId', [SeasonsController, 'destroy'])

// Players Routes
router.get('/players', [PlayersController, 'index'])
router.post('/players', [PlayersController, 'store'])
router.get('/players/:playerId', [PlayersController, 'show'])
router.patch('/players/:playerId', [PlayersController, 'update'])
router.delete('/players/:playerId', [PlayersController, 'destroy'])

router
  .group(() => {
    // Season Registrations Routes
    router.get('/players', [SeasonRegistrationsController, 'index'])
    router.post('/players', [SeasonRegistrationsController, 'store'])
    router.get('/players/:playerId', [SeasonRegistrationsController, 'show'])
    router.patch('/players/:playerId', [SeasonRegistrationsController, 'update'])
    router.delete('/players/:playerId', [SeasonRegistrationsController, 'destroy'])

    // Days  Routes
    router.get('/days', [DaysController, 'index'])
    router.post('/days', [DaysController, 'store'])
    router.get('/days/:dayIndex', [DaysController, 'show'])

    // Training Scores Routes
    router.get('/days/:dayIndex/training-scores', [TrainingScoresController, 'index'])
    router.post('/days/:dayIndex/training-scores', [TrainingScoresController, 'store'])

    // Champ matches Routes
    router.get('/days/:dayIndex/champ-matches', [ChampMatchesController, 'index'])
    router.post('/days/:dayIndex/champ-matches', [ChampMatchesController, 'store'])
  })
  .prefix('/seasons/:seasonId')
  .use(middleware.CheckExistingSeason())

// ranking routes
router
  .group(() => {
    router.get('/rankings/:seasonId/days/:dayIndex', [RankingsController, 'dayRanking'])
    router.get('/rankings/seasons/:seasonId', [RankingsController, 'seasonRanking'])
  })
  .use(middleware.CheckExistingSeason())
// Routes import
// SeasonRoutes()
