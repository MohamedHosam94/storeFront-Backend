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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const endPoint = (0, supertest_1.default)(index_1.default);
describe("Test EndPoint Response", () => {
    describe("Test Users EndPoint Response", () => {
        it('Test get all method on users', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield endPoint.get('/api/users');
            expect(response.status).toBe(200);
            done();
        }));
        it('Test show one user method', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield endPoint.get('/api/users/1');
            expect(response.status).toBe(200);
            done();
        }));
        it('Test create one user method', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield endPoint.post('/api/users');
            expect(response.status).toBe(200);
            done();
        }));
        it('Test update user method', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield endPoint.patch('/api/users/1');
            expect(response.status).toBe(200);
            done();
        }));
        it('Test delete user method', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield endPoint.delete('/api/users/1');
            expect(response.status).toBe(200);
            done();
        }));
    });
    describe("Test Orders EndPoint Response", () => {
        it('Test get all orders method', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield endPoint.get('/api/users/1/orders');
            expect(response.status).toBe(200);
            done();
        }));
        it('Test get one order method', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield endPoint.get('/api/users/1/orders/1');
            expect(response.status).toBe(200);
            done();
        }));
        it('Test create order method', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield endPoint.post('/api/users/1/orders');
            expect(response.status).toBe(200);
            done();
        }));
        it('Test update order method', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield endPoint.patch('/api/users/1/orders/1');
            expect(response.status).toBe(200);
            done();
        }));
        it('Test addToCart method', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield endPoint.post('/api/users/1/orders/1/cart');
            expect(response.status).toBe(200);
            done();
        }));
        it('Test removeFromCart method', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield endPoint.delete('/api/users/1/orders/1/cart/1');
            expect(response.status).toBe(200);
            done();
        }));
    });
    describe("Test Products EndPoint Response", () => {
        it('Test get All Products method', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield endPoint.get('/api/products');
            expect(response.status).toBe(200);
            done();
        }));
        it('Test get specific product method', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield endPoint.get('/api/products/1');
            expect(response.status).toBe(200);
            done();
        }));
        it('Test create product method', (done) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield endPoint.post('/api/products');
            expect(response.status).toBe(200);
            done();
        }));
    });
});
