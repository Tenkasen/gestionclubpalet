/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import SeasonRoutes from './routes/seasons.js'
import PlayerRoutes from './routes/players.js'

router.get('/', async () => {
  return {
    message: 'API is running',
  }
})

// Routes import
SeasonRoutes()
PlayerRoutes()
