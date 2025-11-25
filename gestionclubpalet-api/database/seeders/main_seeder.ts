import { BaseSeeder } from '@adonisjs/lucid/seeders'
import SeasonSeeder from './season_seeder.js'
import PlayerSeeder from './player_seeder.js'
import SeasonRegistrationSeeder from './season_registration_seeder.js'

export default class MainSeeder extends BaseSeeder {
  async run() {
    await new SeasonSeeder(this.client).run()
    await new PlayerSeeder(this.client).run()
    await new SeasonRegistrationSeeder(this.client).run()
  }
}
