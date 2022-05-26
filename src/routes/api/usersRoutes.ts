import { Router } from 'express';
import * as controller from '../../controllers/userController';
import authMiddleware from '../../middleware/main';

const users = Router();


//  This Route should have admin privileges
users.get('/' , authMiddleware, controller.index);


users.post('/' , controller.create);

users.get('/:id', authMiddleware , controller.show);

users.patch('/:id', authMiddleware , controller.update);

users.delete('/:id', authMiddleware , controller.destroy);


// This route authenticate user by user & password and returns back a JWT token
users.post('/authenticate' , controller.authenticate);

export default users;