import { NextFunction, Request , Response } from 'express';
import jwt from 'jsonwebtoken';


const secretTokenSign = process.env.TOKEN_SECRET as unknown as string;

const authTokenValidate = (req: Request, res: Response, next: NextFunction) => {

  try {    
   const reqHeader = req.headers.authorization as string;

   if (reqHeader) {
    const authToken = reqHeader.split(' ')[1];
    const checkToken = jwt.verify(authToken , secretTokenSign);
    
    if (checkToken){
      
      return next();     
    } 
    
    // else {
    //   throw new Error("You are Not Authorized");
      
    // }
   }  

   return res.json({ Error:'Please Try Again'});
   
  } catch (err) {
    return res.status(401)
              .json({ Error: 'Please Try Again'});
        
  }
}



export default authTokenValidate;