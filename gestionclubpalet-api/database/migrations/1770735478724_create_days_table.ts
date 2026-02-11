import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'days'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('season_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('seasons')
        .onDelete('CASCADE')
      table.integer('index_jour').unsigned().notNullable()
      table.date('date')
      table.enum('status', ['DRAFT', 'VALIDATED', 'ARCHIVED']).defaultTo('DRAFT')
      table.boolean('closed').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')

      // a season can't have 2 times the same day
      table.unique(['season_id', 'index_jour'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
