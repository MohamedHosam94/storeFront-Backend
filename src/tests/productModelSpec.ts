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



  it('Create method should create a product', async () => {
    
    const productResult = await product.create('itemTest', 230)

    expect(productResult).toEqual({
      id: productResult.id,
      name: 'itemTest',
      price: 230
    });
  });



  it('Index method should return all products', async () => {
    
    const productResult = await product.index();

    expect(productResult.length).toBeGreaterThanOrEqual(1);
  });



  it('Show method should return a product', async () => {
    
    const productResult = await product.show('1');

    expect(productResult).toEqual({
      id: 1 as any,
      name: productResult.name,
      price: productResult.price
    });
  });





});