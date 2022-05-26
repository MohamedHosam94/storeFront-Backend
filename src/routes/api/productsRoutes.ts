import { Router } from 'express';
import * as productController from '../../controllers/productController';
import authMiddleware from '../../middleware/main';

const products = Router();


products.get('/', productController.index);

products.get('/:productId', productController.show);


// Create and Destroy Routes should be to admin Dashboard not storeFront but here it is
// added for demonstration 
products.post('/', authMiddleware, productController.create);

products.delete('/:productId', productController.destroy);


export default products;