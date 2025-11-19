const SeasonsController = () => import('#controllers/seasons_controller')
import router from '@adonisjs/core/services/router'

export default function SeasonRoutes() {
  router.group(() => {
    router.get('/seasons', [SeasonsController, 'index'])
    router.post('/seasons', [SeasonsController, 'store'])
    router.get('/seasons/:id', [SeasonsController, 'show'])
    router.patch('/seasons/:id', [SeasonsController, 'update'])
    router.delete('/seasons/:id', [SeasonsController, 'destroy'])
  })
}
