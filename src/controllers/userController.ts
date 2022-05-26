import { NextFunction, Request , Response } from 'express';
import { UserModel , User} from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const user = new UserModel();

const hashPassword = (passwd: string) => {
  const salt = parseInt(process.env.SALT_ROUNDS as string);
   
  return bcrypt.hashSync( passwd + process.env.BCRYPT_PWD, salt );
 }


export const index = async (_req: Request , res: Response , next: NextFunction) => {
  console.log('Hello from controller index');
  try {
    const users = await user.index();
    res.json({
       users : [...users]
    });
  } catch (err) {
    
    next(err);
  }
  
}


export const create = async (req: Request , res: Response , next: NextFunction) => {
  console.log('Hello from controller create');

  const userData: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashPassword(req.body.password)
  }

  // console.log(userData);
  // console.log(req.body);
  
  
  try {
    const users = await user.create(userData);
    res.json({
      users : users
    });
  } catch (err) {
    
    next(err);
  }
  
}


export const show = async (req: Request , res: Response , next: NextFunction) => {
  console.log('Hello from controller show');
  
  
  try {
    const oneUser = await user.show(req.params.id as unknown as string);
    res.json({
      user : oneUser
    });
  } catch (err) {
    
    next(err);
  }
  
}



export const update = async (req: Request , res: Response , next: NextFunction) => {
  console.log('Hello from controller update');

  const userData: User = {
    id: req.params.id as unknown as number,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashPassword(req.body.password)
  }

  console.log(userData);
  
  
  try {
    const updatedUser = await user.update(userData);
    res.json({
      user : updatedUser
    });
  } catch (err) {
    
    next(err);
  }
  
}



export const destroy = async (req: Request , res: Response , next: NextFunction) => {
  console.log('Hello from controller destroy');
  try {
    const deletedUser = await user.delete(req.params.id as unknown as string);
    res.json({
      user : deletedUser
    });
  } catch (err) {
    
    next(err);
  }
  
}


export const authenticate = async (req: Request , res: Response , next: NextFunction) => {

  try {
    const email = req.body.email;
    const password = req.body.password;

    const userAuth = await user.authenticate(email , password);
    const token = jwt.sign({ userAuth } , process.env.TOKEN_SECRET as unknown as string);
    
    if (!userAuth) {
      return res.status(401).json({
         message: 'The username or password does not exist , Try Again'
      });
    }

    return res.json({
      data: userAuth,
      message: 'User Login Succesfully',
      token: token,
    });
  } catch (err) {

    next(err);
    
  }


}