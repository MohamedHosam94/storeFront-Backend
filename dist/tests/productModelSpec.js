"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = require("../models/productModel");
const product = new productModel_1.ProductModel();
describe("Product Model", () => {
    it('should have an index method', () => {
        expect(product.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(product.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(product.create).toBeDefined();
    });
});
