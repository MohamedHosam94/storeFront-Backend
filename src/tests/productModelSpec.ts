import { ProductModel , Product} from '../models/productModel';


const product = new ProductModel();



describe("Product Model", () => {
 
  it('should have an index method', () => {
    expect(product.index).toBeDefined();
  });


  it('should have a show method', () => {
    expect(product.show).toBeDefined();
  });


  it('should have a create method', () => {
    expect(product.create).toBeDefined();
  });

});