import client from '../database';


export type Order = {
  id?: string;
  status: string;
  price?: number;
  user_id: string;
};


export class OrderModel {


  //  Get All orders for a specific user
  async index(userId: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const query = `SELECT * FROM orders WHERE user_id='${userId}'`;
      const result = await conn.query(query);
      conn.release();
    
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get your orders. Error is: ${err}`);
    }
  }



  async show(orderId: string , userId: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const query = `SELECT * FROM orders WHERE id='${orderId}' AND user_id='${userId}'`;
      const result = await conn.query(query);
      conn.release();
    
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get your order, Try Again.  Error is: ${err}`);
    }
  }



  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const query = `INSERT INTO orders (status, user_id) VALUES ('${order.status}', '${order.user_id}') RETURNING *`;

      const result = await conn.query(query);
      
      conn.release();
      
      return result.rows[0];
            
    } catch (err) {
      
      throw new Error(`ERROR: Cannot create order, Try Again. Error is: ${err}`);
    }
  }



  async update(order: Order): Promise<Order> {
   
    try {
      const conn = await client.connect();
      const query = `UPDATE orders SET 
      status='${order.status}', 
      user_id='${order.user_id}'
      
      WHERE id='${order.id}' RETURNING *`;

      const result = await conn.query(query);
      conn.release();
      
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot update order with id=${order.id}. Error is: ${err}`);
    }

  }


  //  Order should not be deleted instead it's status is updated to closed, 
  //  so this method is not used in controller 

  async delete(id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const query = `DELETE FROM orders WHERE id='${id}'`;
      
      const result = await conn.query(query);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete order ${id}. Error is: ${err}`);
    }
  }

  


 async addToCart(orderId: string, productId: string, quantity: number): Promise<Order> {
   
    try {

      const conn = await client.connect();
      const query = `INSERT INTO order_products 
      (quantity, order_id, product_id) 
      VALUES ('${quantity}', '${orderId}', '${productId}') 
      RETURNING *`;

      const result = await conn.query(query);
      
      conn.release();
      
      return result.rows[0];
     
   } catch (err) {
    throw new Error(`Cannot add to cart. Error is: ${err}`);
   }

 }




 async removeFromCart(orderProductId: string, orderId: string, userId: string): Promise<Order | undefined> {

      //  Get Order and check if it is open or closed , if closed throw error
   try {
      const conn = await client.connect();
      const query = `SELECT * FROM orders WHERE id='${orderId}' AND user_id='${userId}'`;
      const result = await conn.query(query);
      conn.release();
    
      if ( result.rows[0].status === 'closed' ) {
        throw new Error(`The order is closed, cannot remove product from cart`);
        
      }

   } catch (err) {
     throw new Error(`Cannot delete product from cart: ${err}`);
     
   }


   try {

    const conn = await client.connect();
    const deleteQuery = `DELETE FROM order_products WHERE id='${orderProductId}'`;
    const result = await conn.query(deleteQuery);
    conn.release();

    return result.rows[0];
   } catch (err) {
     
    throw new Error(`Cannot delete product from cart: ${err}`);
   }


 }

 

}