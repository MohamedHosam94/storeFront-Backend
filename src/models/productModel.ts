import client from '../database';


export type Product = {
  id?: string;
  name: string;
  price: number;

};



export class ProductModel {


  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const query = `SELECT * FROM products`;
      const result = await conn.query(query);
      conn.release();
    
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products. ${err}`);
    }
  }



  async show(productId: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const query = `SELECT * FROM products WHERE id='${productId}'`;
      const result = await conn.query(query);
      conn.release();
    
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get product. ${err}`);
    }
  }



  //  Create , Update and Delete methods is not required in a storeFront Api project


  async create(productName: string, price: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const query = `INSERT INTO products (name, price) VALUES ('${productName}', '${price}') RETURNING *`;

      const result = await conn.query(query);
      
      conn.release();
      
      return result.rows[0];
            
    } catch (err) {
      
      throw new Error(`ERROR: Cannot create Product, Try Again. Error is: ${err}`);
    }
  }



  async delete(id: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const query = `DELETE FROM products WHERE id='${id}' RETURNING *`;
      
      const result = await conn.query(query);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete product ${id}. Error is: ${err}`);
    }
  }


}