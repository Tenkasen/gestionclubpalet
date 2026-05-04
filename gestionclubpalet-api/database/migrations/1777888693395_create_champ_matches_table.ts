import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'champ_matches'

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

      // 6 games to enter
      table.integer('partie_1_pour').unsigned().notNullable().defaultTo(0)
      table.integer('partie_1_contre').unsigned().notNullable().defaultTo(0)
      table.integer('partie_2_pour').unsigned().notNullable().defaultTo(0)
      table.integer('partie_2_contre').unsigned().notNullable().defaultTo(0)
      table.integer('partie_3_pour').unsigned().notNullable().defaultTo(0)
      table.integer('partie_3_contre').unsigned().notNullable().defaultTo(0)
      table.integer('partie_4_pour').unsigned().notNullable().defaultTo(0)
      table.integer('partie_4_contre').unsigned().notNullable().defaultTo(0)
      table.integer('partie_5_pour').unsigned().notNullable().defaultTo(0)
      table.integer('partie_5_contre').unsigned().notNullable().defaultTo(0)
      table.integer('partie_6_pour').unsigned().notNullable().defaultTo(0)
      table.integer('partie_6_contre').unsigned().notNullable().defaultTo(0)

      // calculate points
      table.integer('total_pour').unsigned().notNullable().defaultTo(0)
      table.integer('total_contre').unsigned().notNullable().defaultTo(0)
      table.integer('nb_victoire').unsigned().notNullable().defaultTo(0)
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
