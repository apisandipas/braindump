/*global exports*/
exports.up = function(knex) {
  return knex.schema.createTable('notes', function(table) {
    table.increments('id').primary()
    table.string('title').notNull()
    table.text('body').notNull()
    table.integer('user_id').notNull()
    table.dateTime('created_at').notNull()
    table.dateTime('updated_at').nullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('notes')
}
