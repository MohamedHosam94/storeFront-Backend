import { Router } from 'express';
import * as orderController from '../../controllers/orderController';
import authMiddleware from '../../middleware/main';

const orders = Router();

orders.get('/:userId/orders', authMiddleware, orderController.index);

orders.get('/:userId/orders/:orderId', authMiddleware, orderController.show);

orders.post('/:userId/orders', authMiddleware, orderController.create);


orders.patch('/:userId/orders/:orderId', authMiddleware, orderController.update);


// Cart Routes , it adds to pivot table between orders and products "cart"  
orders.post('/:userId/orders/:orderId/cart', authMiddleware, orderController.addToCart);

orders.delete('/:userId/orders/:orderId/cart/:cartId', authMiddleware,
 orderController.removeFromCart);



export default orders;