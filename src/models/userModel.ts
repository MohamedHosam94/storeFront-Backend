import client from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const query = 'SELECT id, first_name, last_name, email FROM users';
      const result = await conn.query(query);
      conn.release();
    
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users. Error is: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const query = `SELECT id, first_name, last_name, email FROM users where id='${id}'`;
     
      const result = await conn.query(query);
      conn.release();
      
      return result.rows[0];
    } catch (err) {
      throw new Error(`ERROR: Cannot get user with id = ${id}. Error is: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const query = `INSERT INTO users (first_name, last_name, email, password) VALUES ('${user.first_name}', '${user.last_name}', '${user.email}', '${user.password}') RETURNING id, first_name, last_name, email`;

      const result = await conn.query(query);
      
      conn.release();
      console.log(`From Model ${result}`);
      return result.rows[0];
      
      
    } catch (err) {
      
      throw new Error(`ERROR: Cannot create user. Error is: ${err}`);
    }
  }


  async update(user: User): Promise<User> {
   
    try {
      const conn = await client.connect();
      const query = `UPDATE users SET 
      first_name='${user.first_name}', 
      last_name='${user.last_name}',
      email='${user.email}',
      password='${user.password}' 
      WHERE id='${user.id}' RETURNING id, first_name, last_name, email`;

      const result = await conn.query(query);
      conn.release();
      console.log(query);
      
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot update user with id=${user.id}. Error is: ${err}`);
    }

  }

  async delete(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const query = `DELETE FROM users WHERE id=${id}`;
      
      const result = await conn.query(query);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete user ${id}. Error is: ${err}`);
    }
  }


  async authenticate(email: string , password: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      const query = `SELECT password FROM users WHERE email='${email}'`;
      
      const result = await conn.query(query);

      if(result.rows.length){
        const passwordHash = result.rows[0].password;
        const validPassword = bcrypt
             .compareSync(`${password}${process.env.BCRYPT_PWD}` , passwordHash);

        if(validPassword){

        const userData = await conn
        .query(`SELECT id, first_name, last_name, email FROM users WHERE email='${email}'`);

        return userData.rows[0];
        }     
      }

      conn.release();
      return null;
    } catch (err) {
      throw new Error(`Cannot login ${email}. Error is: ${err}`);
    }
  }

  
}
