import { Request , Response, NextFunction } from 'express';
import { ProductModel , Product} from '../models/productModel';


const product = new ProductModel();


export const index = async (req: Request , res: Response , next: NextFunction) => {
  // console.log('Hello from productController index');
  
  try {
    const allProducts = await product.index();

    res.json({
       products_count: allProducts.length,
       Products : [...allProducts]
    });
  } catch (err) {
    
    next(err);
  }

}



export const show = async (req: Request , res: Response , next: NextFunction) => {
  // console.log('Hello from productController show');
  
  try {
    const getProduct = await product.show(req.params.productId as string);
    
    res.json({
       
       Product : getProduct
    });
  } catch (err) {
    
    next(err);
  }
}


 //  Create , Update and Delete methods is not required in a storeFront Api project
 


 export const create = async (req: Request , res: Response , next: NextFunction) => {
  console.log('Hello from Product Controller create');

  const productName: string = req.body.productName;
  const price: number = parseFloat(req.body.price);

  try {
    const createdProduct = await product.create(productName, price);

    res.json({
      status  : 'Product Created Successfuly', 
      Product : createdProduct
    });

  } catch (err) {
    
    next(err);
  }
  
}




export const destroy = async (req: Request , res: Response , next: NextFunction) => {
  console.log('Hello from Product Controller destroy');

  try {
    const deletedProduct = await product.delete(req.params.productId as unknown as string);
    res.json({
      status  : 'Product Deleted Successfuly',
      Deleted_Product : deletedProduct
    });

  } catch (err) {
    
    next(err);
  }
  
}