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
const orderModel_1 = require("../models/orderModel");
const userModel_1 = require("../models/userModel");
const productModel_1 = require("../models/productModel");
const product = new productModel_1.ProductModel();
const order = new orderModel_1.OrderModel();
const user = new userModel_1.UserModel();
describe("Order Model", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.create({
            first_name: 'Mo',
            last_name: 'Neny',
            email: 'testOrder@email.com',
            password: '1234'
        });
        yield product.create('itemOrder', 500);
    }));
    it('should have an index method', () => {
        expect(order.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(order.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(order.create).toBeDefined();
    });
    it('should have an update method', () => {
        expect(order.update).toBeDefined();
    });
    it('should have an addToCart method', () => {
        expect(order.addToCart).toBeDefined();
    });
    it('should have a removeFromCart method', () => {
        expect(order.removeFromCart).toBeDefined();
    });
    it('Create method should create a order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.create({
            status: 'open',
            price: null,
            user_id: '2'
        });
        expect(result).toEqual({
            id: result.id,
            status: 'open',
            price: null,
            user_id: '2'
        });
    }));
    it('Index method should get all orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.index('2');
        expect(result.length).toBeGreaterThanOrEqual(1);
    }));
    it('Show method should get an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.show('1', '2');
        expect(result).toEqual({
            id: 1,
            status: 'open',
            price: null,
            user_id: '2'
        });
    }));
    it('Update method should update an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.update({
            id: '1',
            status: 'close',
            price: null,
            user_id: '2'
        });
        expect(result).toEqual({
            id: 1,
            status: 'close',
            price: null,
            user_id: '2'
        });
    }));
    it('addToCart method should add product to cart', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.addToCart('1', '1', 7);
        const resultType = result;
        expect(resultType).toEqual({
            id: 1,
            quantity: 7,
            order_id: '1',
            product_id: '1'
        });
    }));
    it('removeFromCart method should remove product from cart', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.removeFromCart('1', '1', '2');
        expect(result).toBeUndefined();
    }));
});
