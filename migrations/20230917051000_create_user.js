/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE IF NOT EXISTS mt_user  (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                fullname VARCHAR(255) NOT NULL,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                token VARCHAR(255),
                expiredat timestamp,
                createdAt timestamp NOT NULL DEFAULT NOW()
        );

`);  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`DROP TABLE IF EXISTS mt_user`);
};
