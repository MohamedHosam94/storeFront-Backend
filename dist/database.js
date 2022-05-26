"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PWD, POSTGRES_DB_TEST, ENV } = process.env;
// Client ENV Type;
console.log(`----------- This is ${ENV} Client --------------`);
let client;
if (ENV === 'test') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PWD
    });
}
else {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PWD,
    });
}
// console.log(POSTGRES_HOST , POSTGRES_DB , POSTGRES_USER , POSTGRES_PWD);
client.on('error', (err) => {
    console.error(err.message);
});
exports.default = client;
