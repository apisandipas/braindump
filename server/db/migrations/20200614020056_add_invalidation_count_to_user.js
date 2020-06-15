exports.up = knex =>
  knex.schema.table('users', table => {
    table.integer('invalidation_count').defaultTo(0)
  })

exports.down = knex =>
  knex.schema.table('users', table => {
    table.dropColumn('invalidation_count')
  })
