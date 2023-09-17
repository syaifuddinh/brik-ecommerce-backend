"use strict";

import { ProductListInterface } from "../interfaces/ProductInterface";
import { ProductInterface } from "../interfaces/ProductInterface";
import { StoringProductAPIInterface } from "../interfaces/ProductInterface";
import { ProductDetailInterface } from "../interfaces/ProductInterface";
import Product from "../models/Product";
import fs from "fs";
import path from "path";

var ResponseConstructor = require("../response.ts");
module.exports = new class ProductController {
    async get(start: number, limit: number, keyword?: string) {
        const product = new Product(); 
        await product.fetchList({ keyword, limit, start });
        const products: ProductListInterface[] = product.getList();
        const meta = product.getMeta();
        return new ResponseConstructor({ data: products, isList: true, meta, isDatatable: true });
    }

    async show(id: string) {
        try {
            const product = new Product(); 
            await product.fetchDetail(id);
            const data: ProductDetailInterface = product.getDetail();
            return new ResponseConstructor({ data });
        } catch (e) {
            const r = new ResponseConstructor({})
            return r.failure(e);
        }
    }

    async store(params: StoringProductAPIInterface) {
        try {
            const product = new Product(); 
            const file = params.thumbnail;
            const thumbnail = file.filename;
            // const filePath = path.join(__dirname, 'storage', file.filename);
            const origin = path.join(__dirname,  file.path);
            const dest = path.join(__dirname,  "storage/product", thumbnail);
            fs.copyFile(origin, dest, () => {
                fs.unlink(origin, () => {});
            })

            const productParam: ProductInterface = <ProductInterface> params; 
            productParam.thumbnail = thumbnail;

            await product.store(params);
            return new ResponseConstructor({});
        } catch (e) {
            const r = new ResponseConstructor({})
            return r.failure(e);
        }
    }
};
