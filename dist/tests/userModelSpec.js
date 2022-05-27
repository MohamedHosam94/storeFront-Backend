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
const userModel_1 = require("../models/userModel");
const user = new userModel_1.UserModel();
describe("User Model", () => {
    it('should have an index method', () => {
        expect(user.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(user.create).toBeDefined();
    });
    it('should have a show method', () => {
        expect(user.show).toBeDefined();
    });
    it('should have an update method', () => {
        expect(user.update).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(user.delete).toBeDefined();
    });
    it('should have an authenticate method', () => {
        expect(user.authenticate).toBeDefined();
    });
    it('Create method should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.create({
            first_name: 'Mo',
            last_name: 'Neny',
            email: 'test@email.com',
            password: '1234'
        });
        expect(result).toEqual({
            id: result.id,
            first_name: 'Mo',
            last_name: 'Neny',
            email: 'test@email.com'
        });
    }));
    it('Index method should get All users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.index();
        expect(result.length).toBeGreaterThanOrEqual(2);
    }));
    it('Show method should get one user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.show('1');
        expect(result).toEqual({
            id: 1,
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email
        });
    }));
    it('Update method should update a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.update({
            id: 1,
            first_name: 'Mo',
            last_name: 'Neny',
            email: 'testUpdated@email.com',
            password: '1234'
        });
        expect(result).toEqual({
            id: result.id,
            first_name: 'Mo',
            last_name: 'Neny',
            email: 'testUpdated@email.com'
        });
    }));
    it('Authenticate method should return a null if email is wrong', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.authenticate('wrongEmail@email.com', '1234');
        expect(result).toBeNull();
    }));
    it('Delete method should delete a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.delete('1');
        expect(result).toBeUndefined();
    }));
});
