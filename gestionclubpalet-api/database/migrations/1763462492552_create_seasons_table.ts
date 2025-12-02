import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'seasons'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nom').notNullable()
      table.enum('type', ['ENTRAINEMENT', 'CHAMPIONNAT', 'COUPE']).notNullable()
      table.date('date_debut').notNullable()
      table.date('date_fin').nullable()
      table.integer('club_id').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
