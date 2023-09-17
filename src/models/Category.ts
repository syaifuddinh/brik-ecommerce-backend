import { CategoryListInterface } from "../interfaces/CategoryInterface";

var Connector = require("../config/connector.ts")

module.exports = class Category {
    #table = "productcategory";
    #list: CategoryListInterface[] = <CategoryListInterface[]> [];

    async fetchList() {
        const conn = new Connector();
        await conn.get(`SELECT id, name AS title FROM ${this.#table}`);
        this.#list = <CategoryListInterface[]> conn.result;
    }

    getList() {
        return this.#list;
    }
}