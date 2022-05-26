import { Router } from 'express';
import usersRoutes from './api/usersRoutes';
import orderRoutes from './api/ordersRoutes';
import productsRoutes from './api/productsRoutes';


const routes = Router();

routes.use('/users' , usersRoutes);

routes.use('/users' , orderRoutes);

routes.use('/products', productsRoutes);

export default routes;