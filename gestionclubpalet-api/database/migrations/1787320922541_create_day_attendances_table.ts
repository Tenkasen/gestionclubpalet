import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'day_attendances'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('day_id')
        .unsigned() // positive
        .notNullable()
        .references('id')
        .inTable('days')
        .onDelete('CASCADE')
      table
        .integer('player_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('players')
        .onDelete('CASCADE')

      // a player can't be register 2 times in the same day
      table.unique(['day_id', 'player_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
