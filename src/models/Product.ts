import { ProductListInterface } from "../interfaces/ProductInterface";
import { ProductInterface } from "../interfaces/ProductInterface";
import { ProductDetailInterface } from "../interfaces/ProductInterface";

var Connector = require("../config/connector.ts")

export default class Product {
    #table = "product";
    #list: ProductListInterface[] = <ProductListInterface[]> [];
    #limit: number = 10;
    #start: number = 0;
    #total: number = 0;
    #detail: ProductDetailInterface = <ProductDetailInterface> {};
    #imagePath: string = `${process.env.HOST}/images/`;

    async fetchList({ keyword, start, limit }: { keyword?: string, start: number, limit: number }) {
        const conn = new Connector();
        let condition = "";
        this.#start = start;
        this.#limit = limit;
        if(keyword) condition = ` AND  LOWER(name) LIKE '%${keyword.toLowerCase()}%' `; 
        let command: string = `SELECT id, name AS title,  price, CONCAT('${this.#imagePath}', thumbnailfile) AS thumbnail FROM ${this.#table}  WHERE 1 = 1 ${condition} ORDER  BY createdat DESC`;
        await this.#setTotal(command)
        command += ` LIMIT ${limit} OFFSET ${start}`;
        console.log(command);
        await conn.get(command);
        this.#list = <ProductListInterface[]> conn.result;
    }

    async fetchDetail(id: string) {
        const conn = new Connector();
        let command: string = `SELECT product.id, product.name AS title, price, sku, categoryId, productcategory.name AS categoryName, description, weight, length, width, height, CONCAT('${this.#imagePath}', thumbnailFile) as thumbnail FROM ${this.#table} LEFT JOIN productcategory ON product.categoryid = productcategory.id WHERE product.id = '${id}'`;
        console.log(command);
        await conn.get(command);
        this.#detail = <ProductDetailInterface> conn.result[0];
    }

    getDetail() {
        return this.#detail;
    }

    async #setTotal(command: string) {
        const conn = new Connector();
        let countingCommand: string = `SELECT COUNT(id) AS count FROM (${command}) AS buffer`;
        await conn.get(countingCommand);
        this.#total =  conn.result[0].count as number;

    }

    async store(params: ProductInterface) {
        const { 
            title,
            sku,
            categoryId,
            description,
            price,
            weight,
            length,
            width,
            height,
            thumbnail
        } = <ProductInterface> params;
        const conn = new Connector();
        const command = `
        INSERT INTO product (
            name,
            sku,
            categoryId,
            description,
            price,
            weight,
            length,
            width,
            height,
            thumbnailFile
        ) VALUES (
            '${title}',
            '${sku}',
            '${categoryId}',
            '${description}',
            ${price},
            ${weight},
            ${length},
            ${width},
            ${height},
            '${thumbnail}'
        )
        `;
        await conn.execute(command);
    }

    getMeta() {
        const page = Math.floor(this.#start / this.#limit) + 1;
        const length = Math.ceil(this.#total / this.#limit);
        return {
            start: this.#start,
            limit: this.#limit,
            total: this.#total,
            length,
            page
        }
    }

    getList() {
        return this.#list;
    }
}