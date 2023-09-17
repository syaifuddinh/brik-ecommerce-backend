const bcrypt = require("bcryptjs");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const users = ["admin", "admin2", "didin"];
    const password = "12345678";
    for(idx in users) {
        const user = users[idx];
        const encryptedPassword = bcrypt.hashSync(password, 18)
        await knex.raw(`INSERT INTO mt_user (fullname, username, password) VALUES('${user}', '${user}', '${encryptedPassword}')`);
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.raw("DELETE FROM mt_user")
};
