"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderModel_1 = require("../models/orderModel");
const order = new orderModel_1.OrderModel();
describe("Order Model", () => {
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
});
