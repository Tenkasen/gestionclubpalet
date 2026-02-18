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

router.get('/', async () => {
  return {
    message: 'API is running',
  }
})

// Seasons Routes
router.get('/seasons', [SeasonsController, 'index'])
router.post('/seasons', [SeasonsController, 'store'])
router.get('/seasons/:id', [SeasonsController, 'show'])
router.patch('/seasons/:id', [SeasonsController, 'update'])
router.delete('/seasons/:id', [SeasonsController, 'destroy'])

// Players Routes
router.get('/players', [PlayersController, 'index'])
router.post('/players', [PlayersController, 'store'])
router.get('/players/:id', [PlayersController, 'show'])
router.patch('/players/:id', [PlayersController, 'update'])
router.delete('/players/:id', [PlayersController, 'destroy'])

// Season Registrations Routes
router.get('/seasons/:seasonId/players', [SeasonRegistrationsController, 'index'])
router.post('/seasons/:seasonId/players', [SeasonRegistrationsController, 'store'])
router.get('/seasons/:seasonId/players/:playerId', [SeasonRegistrationsController, 'show'])
router.patch('/seasons/:seasonId/players/:playerId', [SeasonRegistrationsController, 'update'])
router.delete('/seasons/:seasonId/players/:playerId', [SeasonRegistrationsController, 'destroy'])

// Days  Routes
router.get('/days', [DaysController, 'index'])
router.post('/days', [DaysController, 'store'])
router.get('/days/:id', [DaysController, 'show'])

// Routes import
// SeasonRoutes()
