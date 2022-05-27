import { OrderModel , Order} from '../models/orderModel';
import { UserModel , User} from '../models/userModel';
import { ProductModel , Product} from '../models/productModel';



const product = new ProductModel();

const order = new OrderModel();

const user = new UserModel();




describe("Order Model", () => {
 
  beforeAll( async () => {
    const result = await user.create({
      first_name: 'Mo',
      last_name: 'Neny',
      email: 'testOrder@email.com',
      password: '1234'
    });

    await product.create('itemOrder', 500);
  });



  
  it('should have an index method', () => {
    expect(order.index).toBeDefined();
  });


  it('should have a show method', () => {
    expect(order.show).toBeDefined();
  });


  it('should have a create method', () => {
    expect(order.create).toBeDefined();
  });


  it('should have an update method', () => {
    expect(order.update).toBeDefined();
  });


  it('should have an addToCart method', () => {
    expect(order.addToCart).toBeDefined();
  });


  it('should have a removeFromCart method', () => {
    expect(order.removeFromCart).toBeDefined();
  });



  it('Create method should create a order', async () => {
    
    const result = await order.create({
      status: 'open',
      price: null as unknown as undefined,
      user_id: '2'
    });

    expect(result).toEqual({
      id: result.id,
      status: 'open',
      price: null as unknown as undefined,
      user_id: '2'
    });
  });



  it('Index method should get all orders', async () => {
    
    const result = await order.index('2');

    expect(result.length).toBeGreaterThanOrEqual(1);
  });


  it('Show method should get an order', async () => {
    
    const result = await order.show('1', '2');

    expect(result).toEqual({
      id: 1 as unknown as undefined,
      status: 'open',
      price: null as unknown as undefined,
      user_id: '2'
    });
  });




  it('Update method should update an order', async () => {
    
    const result = await order.update({
      
      id: '1',
      status: 'close',
      price: null as unknown as undefined,
      user_id: '2'
    });

    expect(result).toEqual({
      id: 1 as unknown as undefined,
      status: 'close',
      price: null as unknown as undefined,
      user_id: '2'
    });
  });




  it('addToCart method should add product to cart', async () => {
    
    const result = await order.addToCart('1', '1', 7);

    const resultType: any = result; 
    expect(resultType).toEqual({ 
      id: 1,
      quantity: 7,
      order_id: '1',
      product_id:'1'
    });
  });


  it('removeFromCart method should remove product from cart', async () => {
    
    const result = await order.removeFromCart('1', '1', '2');

    expect(result).toBeUndefined();
  });




});