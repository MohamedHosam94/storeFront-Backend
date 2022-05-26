"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.create = exports.show = exports.index = void 0;
const productModel_1 = require("../models/productModel");
const product = new productModel_1.ProductModel();
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('Hello from productController index');
    try {
        const allProducts = yield product.index();
        res.json({
            products_count: allProducts.length,
            Products: [...allProducts]
        });
    }
    catch (err) {
        next(err);
    }
});
exports.index = index;
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('Hello from productController show');
    try {
        const getProduct = yield product.show(req.params.productId);
        res.json({
            Product: getProduct
        });
    }
    catch (err) {
        next(err);
    }
});
exports.show = show;
//  Create , Update and Delete methods is not required in a storeFront Api project
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Hello from Product Controller create');
    const productName = req.body.productName;
    const price = parseFloat(req.body.price);
    try {
        const createdProduct = yield product.create(productName, price);
        res.json({
            status: 'Product Created Successfuly',
            Product: createdProduct
        });
    }
    catch (err) {
        next(err);
    }
});
exports.create = create;
const destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Hello from Product Controller destroy');
    try {
        const deletedProduct = yield product.delete(req.params.productId);
        res.json({
            status: 'Product Deleted Successfuly',
            Deleted_Product: deletedProduct
        });
    }
    catch (err) {
        next(err);
    }
});
exports.destroy = destroy;
