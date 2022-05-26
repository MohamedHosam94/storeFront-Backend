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
exports.ProductModel = void 0;
const database_1 = __importDefault(require("../database"));
class ProductModel {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = `SELECT * FROM products`;
                const result = yield conn.query(query);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get products. ${err}`);
            }
        });
    }
    show(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = `SELECT * FROM products WHERE id='${productId}'`;
                const result = yield conn.query(query);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot get product. ${err}`);
            }
        });
    }
    //  Create , Update and Delete methods is not required in a storeFront Api project
    create(productName, price) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = `INSERT INTO products (name, price) VALUES ('${productName}', '${price}') RETURNING *`;
                const result = yield conn.query(query);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`ERROR: Cannot create Product, Try Again. Error is: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = `DELETE FROM products WHERE id='${id}' RETURNING *`;
                const result = yield conn.query(query);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot delete product ${id}. Error is: ${err}`);
            }
        });
    }
}
exports.ProductModel = ProductModel;
