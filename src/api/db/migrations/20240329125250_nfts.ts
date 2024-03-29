import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable('nfts', (table) => {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.text('description').notNullable();
    table.text('image_url').notNullable();
    table.integer('owner_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
    table.decimal('price', 10, 2).notNullable();
    table.string('status', 50).notNullable();
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTableIfExists('nfts');
};
