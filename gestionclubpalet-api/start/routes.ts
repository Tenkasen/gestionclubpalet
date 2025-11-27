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

router.get('/', async () => {
  return {
    message: 'API is running',
  }
})

// Seasons routes
router.get('/seasons', [SeasonsController, 'index'])
router.post('/seasons', [SeasonsController, 'store'])
router.get('/seasons/:id', [SeasonsController, 'show'])
router.patch('/seasons/:id', [SeasonsController, 'update'])
router.delete('/seasons/:id', [SeasonsController, 'destroy'])

// Players routes
router.get('/players', [PlayersController, 'index'])
router.post('/players', [PlayersController, 'store'])
router.get('/players/:id', [PlayersController, 'show'])
router.patch('/players/:id', [PlayersController, 'update'])
router.delete('/players/:id', [PlayersController, 'destroy'])
router.post('/seasons/:seasonId/players', [PlayersController, 'register'])

// Routes import
// SeasonRoutes()
