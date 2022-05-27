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
    it('Create method should create a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const productResult = yield product.create('itemTest', 230);
        expect(productResult).toEqual({
            id: productResult.id,
            name: 'itemTest',
            price: 230
        });
    }));
    it('Index method should return all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const productResult = yield product.index();
        expect(productResult.length).toBeGreaterThanOrEqual(1);
    }));
    it('Show method should return a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const productResult = yield product.show('1');
        expect(productResult).toEqual({
            id: 1,
            name: productResult.name,
            price: productResult.price
        });
    }));
});
