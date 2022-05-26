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
exports.authenticate = exports.destroy = exports.update = exports.show = exports.create = exports.index = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user = new userModel_1.UserModel();
const hashPassword = (passwd) => {
    const salt = parseInt(process.env.SALT_ROUNDS);
    return bcrypt_1.default.hashSync(passwd + process.env.BCRYPT_PWD, salt);
};
const index = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Hello from controller index');
    try {
        const users = yield user.index();
        res.json({
            users: [...users]
        });
    }
    catch (err) {
        next(err);
    }
});
exports.index = index;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Hello from controller create');
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashPassword(req.body.password)
    };
    // console.log(userData);
    // console.log(req.body);
    try {
        const users = yield user.create(userData);
        res.json({
            users: users
        });
    }
    catch (err) {
        next(err);
    }
});
exports.create = create;
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Hello from controller show');
    try {
        const oneUser = yield user.show(req.params.id);
        res.json({
            user: oneUser
        });
    }
    catch (err) {
        next(err);
    }
});
exports.show = show;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Hello from controller update');
    const userData = {
        id: req.params.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashPassword(req.body.password)
    };
    console.log(userData);
    try {
        const updatedUser = yield user.update(userData);
        res.json({
            user: updatedUser
        });
    }
    catch (err) {
        next(err);
    }
});
exports.update = update;
const destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Hello from controller destroy');
    try {
        const deletedUser = yield user.delete(req.params.id);
        res.json({
            user: deletedUser
        });
    }
    catch (err) {
        next(err);
    }
});
exports.destroy = destroy;
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userAuth = yield user.authenticate(email, password);
        const token = jsonwebtoken_1.default.sign({ userAuth }, process.env.TOKEN_SECRET);
        if (!userAuth) {
            return res.status(401).json({
                message: 'The username or password does not exist , Try Again'
            });
        }
        return res.json({
            data: userAuth,
            message: 'User Login Succesfully',
            token: token,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.authenticate = authenticate;
