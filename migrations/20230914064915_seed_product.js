const products = require("../storage/products.json")
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const getRandomNumber = () => {
        return Math.round(Math.random() * 100);
    }

    const getRandomPrice = () => {
        return Math.round(Math.random() * 2000000);
    }

    let command = "INSERT INTO product (id, name, sku, categoryId, thumbnailFile, description, price, weight, length, width, height) VALUES ";
    for(idx in products) {
            const product = products[idx];
            const id = "uuid_generate_v4()";
            const sku = product.sku;
            const categoryId = "(SELECT id FROM productcategory ORDER BY RANDOM() LIMIT 1)";
            const name = product.title;
            const description = "Scan QR-nya untuk lihat barang ini di aplikasi Klontong. Bebas ongkir, lho~"
            const thumbnailFile = "sample.png";
            const price = getRandomPrice();
            const weight = getRandomNumber();
            const length = getRandomNumber();
            const width = getRandomNumber();
            const height = getRandomNumber();
            const createdAt = "NOW()";
            let params = `(${id}, '${name}', '${sku}', ${categoryId}, '${thumbnailFile}', '${description}', ${price}, ${weight}, ${length}, ${width}, ${height})`; 
            if(idx < products.length - 1) params += ", "; 
            command += ` ${params}`;
    }
    await knex.raw(command);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`DELETE FROM product`);
};
