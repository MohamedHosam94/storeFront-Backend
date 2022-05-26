"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretTokenSign = process.env.TOKEN_SECRET;
const authTokenValidate = (req, res, next) => {
    try {
        const reqHeader = req.headers.authorization;
        if (reqHeader) {
            const authToken = reqHeader.split(' ')[1];
            const checkToken = jsonwebtoken_1.default.verify(authToken, secretTokenSign);
            if (checkToken) {
                return next();
            }
            // else {
            //   throw new Error("You are Not Authorized");
            // }
        }
        return res.json({ Error: 'Please Try Again' });
    }
    catch (err) {
        return res.status(401)
            .json({ Error: 'Please Try Again' });
    }
};
exports.default = authTokenValidate;
