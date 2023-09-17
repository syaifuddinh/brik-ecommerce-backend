"use strict";

import { CategoryListInterface } from "../interfaces/CategoryInterface";

var ResponseConstructor = require("../response.ts");
var Category = require("../models/Category.ts");
module.exports = new class CategoryController {
    async get() {
        const category = new Category(); 
        await category.fetchList();
        const categories: CategoryListInterface[] = category.getList();
        return new ResponseConstructor({ data: categories, isList: true });
    }
};
