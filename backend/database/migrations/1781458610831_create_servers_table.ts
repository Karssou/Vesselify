import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'servers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'))
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()

      table.string('name', 100).notNullable()
      table.string('ip_address', 255).notNullable()
      table.text('description').nullable()

      table.string('agent_token', 255).notNullable().unique().index()

      table.enum('status', ['online', 'offline', 'pending']).defaultTo('pending').notNullable()
      table.timestamp('last_ping_at').nullable()

      table.string('os_name', 100).nullable()
      table.string('os_version', 50).nullable()
      table.string('cpu_model', 150).nullable()
      table.integer('cpu_cores').nullable()
      table.bigInteger('ram_total').nullable() // en octets
      table.string('docker_version', 50).nullable()

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
