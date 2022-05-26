"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const main_1 = __importDefault(require("./routes/main"));
// import db from './database';
const app = (0, express_1.default)();
const address = '127.0.0.1:3000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use('/api', main_1.default);
// db.connect().then((client) => {
//   return client
//     .query('SELECT * FROM test123')
//     .then((res) => {
//       client.release();
//       console.log(res.rows , 'woooow');
//     })
//     .catch((err) => {
//       client.release();
//       console.log(err.stack , 'errorrrrr');
//     });
// });
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
