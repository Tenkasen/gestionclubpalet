/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
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

// Season Registrations Routes
router.get('/seasons/:seasonId/players', [SeasonRegistrationsController, 'index'])
router.post('/seasons/:seasonId/players', [SeasonRegistrationsController, 'store'])
router.get('/seasons/:seasonId/players/:playerId', [SeasonRegistrationsController, 'show'])
router.patch('/seasons/:seasonId/players/:playerId', [SeasonRegistrationsController, 'update'])
router.delete('/seasons/:seasonId/players/:playerId', [SeasonRegistrationsController, 'destroy'])

// Days  Routes
router
  .group(() => {
    router.get('days', [DaysController, 'index'])
    router.post('days', [DaysController, 'store'])
    router.get('days/:dayId', [DaysController, 'show'])

    // Training Scores Routes
    router.get('days/:dayId/training-scores', [TrainingScoresController, 'index'])
    router.post('days/:dayId/training-scores', [TrainingScoresController, 'store'])
  })
  .prefix(':seasonId')

// Routes import
// SeasonRoutes()
