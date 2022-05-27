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
exports.UserModel = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserModel {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = 'SELECT id, first_name, last_name, email FROM users';
                const result = yield conn.query(query);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get users. Error is: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = `SELECT id, first_name, last_name, email FROM users where id='${id}'`;
                const result = yield conn.query(query);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`ERROR: Cannot get user with id = ${id}. Error is: ${err}`);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = `INSERT INTO users (first_name, last_name, email, password) VALUES ('${user.first_name}', '${user.last_name}', '${user.email}', '${user.password}') RETURNING id, first_name, last_name, email`;
                const result = yield conn.query(query);
                conn.release();
                // console.log(`From Model ${result}`);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`ERROR: Cannot create user. Error is: ${err}`);
            }
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = `UPDATE users SET 
      first_name='${user.first_name}', 
      last_name='${user.last_name}',
      email='${user.email}',
      password='${user.password}' 
      WHERE id='${user.id}' RETURNING id, first_name, last_name, email`;
                const result = yield conn.query(query);
                conn.release();
                // console.log(query);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot update user with id=${user.id}. Error is: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = `DELETE FROM users WHERE id=${id}`;
                const result = yield conn.query(query);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot delete user ${id}. Error is: ${err}`);
            }
        });
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const query = `SELECT password FROM users WHERE email='${email}'`;
                const result = yield conn.query(query);
                if (result.rows.length) {
                    const passwordHash = result.rows[0].password;
                    const validPassword = bcrypt_1.default
                        .compareSync(`${password}${process.env.BCRYPT_PWD}`, passwordHash);
                    if (validPassword) {
                        const userData = yield conn
                            .query(`SELECT id, first_name, last_name, email FROM users WHERE email='${email}'`);
                        return userData.rows[0];
                    }
                }
                conn.release();
                return null;
            }
            catch (err) {
                throw new Error(`Cannot login ${email}. Error is: ${err}`);
            }
        });
    }
}
exports.UserModel = UserModel;
