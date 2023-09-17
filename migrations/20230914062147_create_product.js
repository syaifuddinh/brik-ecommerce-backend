/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.raw(`
        CREATE TABLE IF NOT EXISTS product  (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR(255) NOT NULL,
                sku VARCHAR(100) NOT NULL,
                categoryId UUID NOT NULL,
                thumbnailFile VARCHAR(100) NOT NULL,
                description VARCHAR(255),
                price DOUBLE  PRECISION NOT NULL DEFAULT 0,
                weight DOUBLE  PRECISION NOT NULL DEFAULT 0,
                length DOUBLE  PRECISION NOT NULL DEFAULT 0,
                width DOUBLE  PRECISION NOT NULL DEFAULT 0,
                height DOUBLE  PRECISION NOT NULL DEFAULT 0,
                createdAt timestamp NOT NULL DEFAULT NOW()
        );

`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`DROP TABLE IF EXISTS product`);
};
