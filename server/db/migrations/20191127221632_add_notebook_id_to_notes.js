exports.up = knex =>
  knex.schema.table('notes', table => {
    table.integer('notebook_id')
  })

exports.down = knex =>
  knex.schema.table('notes', table => {
    table.dropColumn('notebook_id')
  })
