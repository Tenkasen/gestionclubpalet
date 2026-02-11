import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'training_scores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('day_id')
        .unsigned()
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

      table.integer('points_pour').unsigned().notNullable().defaultTo(0)
      table.integer('points_contre').unsigned().notNullable().defaultTo(0)
      table.integer('goal_average').notNullable().defaultTo(0)

      // a player can only have one score per day
      table.unique(['day_id', 'player_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
