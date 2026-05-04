import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'champs_matches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .increments('day_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('days')
        .onDelete('CASCADE')
      table
        .increments('id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('players')
        .onDelete('CASCADE')

      // 6 games to enter
      table.integer('partie1_pour').unsigned().notNullable().defaultTo(0)
      table.integer('partie1_contre').unsigned().notNullable().defaultTo(0)
      table.integer('partie2_pour').unsigned().notNullable().defaultTo(0)
      table.integer('partie2_contre').unsigned().notNullable().defaultTo(0)
      table.integer('partie3_pour').unsigned().notNullable().defaultTo(0)
      table.integer('partie3_contre').unsigned().notNullable().defaultTo(0)
      table.integer('partie4_pour').unsigned().notNullable().defaultTo(0)
      table.integer('partie4_contre').unsigned().notNullable().defaultTo(0)
      table.integer('partie5_pour').unsigned().notNullable().defaultTo(0)
      table.integer('partie5_contre').unsigned().notNullable().defaultTo(0)
      table.integer('partie6_pour').unsigned().notNullable().defaultTo(0)
      table.integer('partie6_contre').unsigned().notNullable().defaultTo(0)

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
