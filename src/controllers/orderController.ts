import { Request , Response, NextFunction } from 'express';
import { OrderModel , Order} from '../models/orderModel';


const order = new OrderModel();


export const index = async (req: Request , res: Response , next: NextFunction) => {
  console.log('Hello from orderController index');
  
  try {
    const userOrders = await order.index(req.params.userId);
    const ordersCount = userOrders.length;
    res.json({
       orders_count: ordersCount,
       orders : [...userOrders]
    });
  } catch (err) {
    
    next(err);
  }

}

  export const show = async (req: Request , res: Response , next: NextFunction) => {
    console.log('Hello from orderController show');
    
    try {
      const getOrder = await order.show(req.params.orderId, req.params.userId as string);
      
      res.json({
         
         order : getOrder
      });
    } catch (err) {
      
      next(err);
    }
  }




  export const create = async (req: Request , res: Response , next: NextFunction) => {
    console.log('Hello from orderController create');

    const orderData: Order = {
      
      status: 'open',
      user_id: req.params.userId,
    }
    
    try {
      //  create new order so the frontEnd developer get the id of the order in the url
      const createdOrder = await order.create(orderData);
      
      res.json({
         Status: 'Order Created Successfully',
         Order : createdOrder
      });
    } catch (err) {
      
      next(err);
    }
  }




  //  add to cart 
  //  1 - create new order and get the id of that order 
  //  2 - pass id to addToCart method and create new order_prduct row  
  
  export const addToCart = async (req: Request , res: Response , next: NextFunction) => {
    console.log('Hello from orderController addcart');

    try {
      //  create new order so the frontEnd developer get the id of the order in the url  
      // const createdOrder = await order.create(orderData);
      

      const orderId:   string = req.params.orderId;
      const productId: string = req.body.productId;
      const quantity:  number = parseInt(req.body.quantity);

      const addProductToCart = await order.addToCart(orderId, productId, quantity);

      res.json({
         status: 'Added To Cart Successfully',
         Cart_Order : addProductToCart
      });

    } catch (err) {
      
      next(err);
    }
  }



  //  We should Not delete order instead we can update it to closed 
  
  export const update = async (req: Request , res: Response , next: NextFunction) => {
    console.log('Hello from orderController update');

    const orderData: Order = {
      id: req.params.orderId,
      status: req.body.orderStatus,
      user_id: req.params.userId
    }
    
    try {
      
      const updatedOrder = await order.update(orderData);
      
      res.json({
         Status: 'Order Updated Successfully',
         Order : updatedOrder
      });
    } catch (err) {
      
      next(err);
    }
    
  }




  export const removeFromCart = async (req: Request , res: Response , next: NextFunction) => {
    console.log('Hello from orderController removeFromCart');

    const cartId: string = req.params.cartId as string;
    const orderId: string = req.params.orderId as string;
    const userId: string = req.params.userId as string;
    
    try {
      
      const deletedItem = await order.removeFromCart(cartId, orderId, userId);
      
      res.json({
         Status: 'Order deleted Successfully',
         Deleted_Item : deletedItem
      });
    } catch (err) {
      
      next(err);
    }
    
  }



