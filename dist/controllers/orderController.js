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
exports.removeFromCart = exports.update = exports.addToCart = exports.create = exports.show = exports.index = void 0;
const orderModel_1 = require("../models/orderModel");
const order = new orderModel_1.OrderModel();
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Hello from orderController index');
    try {
        const userOrders = yield order.index(req.params.userId);
        const ordersCount = userOrders.length;
        res.json({
            orders_count: ordersCount,
            orders: [...userOrders]
        });
    }
    catch (err) {
        next(err);
    }
});
exports.index = index;
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Hello from orderController show');
    try {
        const getOrder = yield order.show(req.params.orderId, req.params.userId);
        res.json({
            order: getOrder
        });
    }
    catch (err) {
        next(err);
    }
});
exports.show = show;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Hello from orderController create');
    const orderData = {
        status: 'open',
        user_id: req.params.userId,
    };
    try {
        //  create new order so the frontEnd developer get the id of the order in the url
        const createdOrder = yield order.create(orderData);
        res.json({
            Status: 'Order Created Successfully',
            Order: createdOrder
        });
    }
    catch (err) {
        next(err);
    }
});
exports.create = create;
//  add to cart 
//  1 - create new order and get the id of that order 
//  2 - pass id to addToCart method and create new order_prduct row  
const addToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Hello from orderController addcart');
    try {
        //  create new order so the frontEnd developer get the id of the order in the url  
        // const createdOrder = await order.create(orderData);
        const orderId = req.params.orderId;
        const productId = req.body.productId;
        const quantity = parseInt(req.body.quantity);
        const addProductToCart = yield order.addToCart(orderId, productId, quantity);
        res.json({
            status: 'Added To Cart Successfully',
            Cart_Order: addProductToCart
        });
    }
    catch (err) {
        next(err);
    }
});
exports.addToCart = addToCart;
//  We should Not delete order instead we can update it to closed 
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Hello from orderController update');
    const orderData = {
        id: req.params.orderId,
        status: req.body.orderStatus,
        user_id: req.params.userId
    };
    try {
        const updatedOrder = yield order.update(orderData);
        res.json({
            Status: 'Order Updated Successfully',
            Order: updatedOrder
        });
    }
    catch (err) {
        next(err);
    }
});
exports.update = update;
const removeFromCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Hello from orderController removeFromCart');
    const cartId = req.params.cartId;
    const orderId = req.params.orderId;
    const userId = req.params.userId;
    try {
        const deletedItem = yield order.removeFromCart(cartId, orderId, userId);
        res.json({
            Status: 'Order deleted Successfully',
            Deleted_Item: deletedItem
        });
    }
    catch (err) {
        next(err);
    }
});
exports.removeFromCart = removeFromCart;
