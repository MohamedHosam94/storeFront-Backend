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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderModel {
    //  Get All orders for a specific user
    index(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = `SELECT * FROM orders WHERE user_id='${userId}'`;
                const result = yield conn.query(query);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get your orders. Error is: ${err}`);
            }
        });
    }
    show(orderId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = `SELECT * FROM orders WHERE id='${orderId}' AND user_id='${userId}'`;
                const result = yield conn.query(query);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot get your order, Try Again.  Error is: ${err}`);
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = `INSERT INTO orders (status, user_id) VALUES ('${order.status}', '${order.user_id}') RETURNING *`;
                const result = yield conn.query(query);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`ERROR: Cannot create order, Try Again. Error is: ${err}`);
            }
        });
    }
    update(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = `UPDATE orders SET 
      status='${order.status}', 
      user_id='${order.user_id}'
      
      WHERE id='${order.id}' RETURNING *`;
                const result = yield conn.query(query);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot update order with id=${order.id}. Error is: ${err}`);
            }
        });
    }
    //  Order should not be deleted instead it's status is updated to closed, 
    //  so this method is not used in controller 
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = `DELETE FROM orders WHERE id='${id}'`;
                const result = yield conn.query(query);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot delete order ${id}. Error is: ${err}`);
            }
        });
    }
    addToCart(orderId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = `INSERT INTO order_products 
      (quantity, order_id, product_id) 
      VALUES ('${quantity}', '${orderId}', '${productId}') 
      RETURNING *`;
                const result = yield conn.query(query);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot add to cart. Error is: ${err}`);
            }
        });
    }
    removeFromCart(orderProductId, orderId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            //  Get Order and check if it is open or closed , if closed throw error
            try {
                const conn = yield database_1.default.connect();
                const query = `SELECT * FROM orders WHERE id='${orderId}' AND user_id='${userId}'`;
                const result = yield conn.query(query);
                conn.release();
                if (result.rows[0].status === 'closed') {
                    throw new Error(`The order is closed, cannot remove product from cart`);
                }
            }
            catch (err) {
                throw new Error(`Cannot delete product from cart: ${err}`);
            }
            try {
                const conn = yield database_1.default.connect();
                const deleteQuery = `DELETE FROM order_products WHERE id='${orderProductId}'`;
                const result = yield conn.query(deleteQuery);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot delete product from cart: ${err}`);
            }
        });
    }
}
exports.OrderModel = OrderModel;
