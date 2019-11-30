exports.up = knex =>
  knex.schema.table('users', table => {
    table
      .integer('count')
      .notNull()
      .defaultTo(0)
  })

exports.down = knex =>
  knex.schema.table('users', table => {
    table.dropColumn('count')
  })
