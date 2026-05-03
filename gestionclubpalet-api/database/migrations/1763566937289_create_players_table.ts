import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'players'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nom').notNullable()
      table.string('prenom').notNullable()
      table.string('email')
      table.string('telephone')
      table.date('anniversaire')
      table.date('date_inscription').notNullable()
      table.boolean('is_guest').defaultTo(false)
      table.integer('club_id').nullable()

      // To sort
      table.index(['nom', 'prenom'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
