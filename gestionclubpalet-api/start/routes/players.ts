const PlayersController = () => import('#controllers/players_controller')
import router from '@adonisjs/core/services/router'

export default function PlayerRoutes() {
  router.group(() => {
    router.get('/players', [PlayersController, 'index'])
  })
}
