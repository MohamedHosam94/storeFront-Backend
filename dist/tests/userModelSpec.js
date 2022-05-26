"use strict";
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
});
