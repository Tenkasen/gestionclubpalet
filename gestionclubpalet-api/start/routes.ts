/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const SeasonsController = () => import('#controllers/seasons_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    message: 'API is running',
  }
})

// Seasons routes
router.get('/seasons', [SeasonsController, 'index'])
router.post('/seasons', [SeasonsController, 'store'])
router.get('/seasons/:id', [SeasonsController, 'show'])
