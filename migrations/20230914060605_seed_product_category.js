/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.raw(`
        INSERT INTO productcategory (id, name) VALUES 
                (uuid_generate_v4(), 'Electronics'),
                (uuid_generate_v4(), 'Clothing'),
                (uuid_generate_v4(), 'Home Appliances'),
                (uuid_generate_v4(), 'Furniture'),
                (uuid_generate_v4(), 'Books'),
                (uuid_generate_v4(), 'Toys and Games'),
                (uuid_generate_v4(), 'Sports and Outdoors'),
                (uuid_generate_v4(), 'Beauty and Personal Care'),
                (uuid_generate_v4(), 'Health and Fitness'),
                (uuid_generate_v4(), 'Jewelry'),
                (uuid_generate_v4(), 'Automotive'),
                (uuid_generate_v4(), 'Garden and Outdoor'),
                (uuid_generate_v4(), 'Office Supplies'),
                (uuid_generate_v4(), 'Pet Supplies'),
                (uuid_generate_v4(), 'Baby Products'),
                (uuid_generate_v4(), 'Kitchen and Dining'),
                (uuid_generate_v4(), 'Music'),
                (uuid_generate_v4(), 'Movies'),
                (uuid_generate_v4(), 'Shoes'),
                (uuid_generate_v4(), 'Handbags and Purses'),
                (uuid_generate_v4(), 'Watches'),
                (uuid_generate_v4(), 'Electronics Accessories'),
                (uuid_generate_v4(), 'Tools and Home Improvement'),
                (uuid_generate_v4(), 'Arts and Crafts'),
                (uuid_generate_v4(), 'Food and Beverages'),
                (uuid_generate_v4(), 'Luggage and Travel'),
                (uuid_generate_v4(), 'Party Supplies'),
                (uuid_generate_v4(), 'Software'),
                (uuid_generate_v4(), 'Stationery'),
                (uuid_generate_v4(), 'Home Decor');

`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`DELETE FROM productcategory`);
};
