import supertest from 'supertest';
import app from '../index';


const endPoint = supertest(app);


describe("Test EndPoint Response", () => {


  describe("Test Users EndPoint Response", () => {
    
      it('Test get all method on users', async (done) => {
        
        const response = await endPoint.get('/api/users');
        expect(response.status).toBe(200);
        done();

      });


      it('Test show one user method', async (done) => {
        
        const response = await endPoint.get('/api/users/1');
        expect(response.status).toBe(200);
        done();

      });


      it('Test create one user method', async (done) => {
        
        const response = await endPoint.post('/api/users');
        expect(response.status).toBe(200);
        done();

      });



      it('Test update user method', async (done) => {
        
        const response = await endPoint.patch('/api/users/1');
        expect(response.status).toBe(200);
        done();

      });



      it('Test delete user method', async (done) => {
        
        const response = await endPoint.delete('/api/users/1');
        expect(response.status).toBe(200);
        done();

      });

  });



  describe("Test Orders EndPoint Response", () => {
    
    it('Test get all orders method', async (done) => {
        
      const response = await endPoint.get('/api/users/1/orders');
      expect(response.status).toBe(200);
      done();

    });


    it('Test get one order method', async (done) => {
        
      const response = await endPoint.get('/api/users/1/orders/1');
      expect(response.status).toBe(200);
      done();

    });



    it('Test create order method', async (done) => {
        
      const response = await endPoint.post('/api/users/1/orders');
      expect(response.status).toBe(200);
      done();

    });


    it('Test update order method', async (done) => {
        
      const response = await endPoint.patch('/api/users/1/orders/1');
      expect(response.status).toBe(200);
      done();

    });


    it('Test addToCart method', async (done) => {
        
      const response = await endPoint.post('/api/users/1/orders/1/cart');
      expect(response.status).toBe(200);
      done();

    });


    it('Test removeFromCart method', async (done) => {
        
      const response = await endPoint.delete('/api/users/1/orders/1/cart/1');
      expect(response.status).toBe(200);
      done();

    });

  });


  describe("Test Products EndPoint Response", () => {
    
    it('Test get All Products method', async (done) => {
        
      const response = await endPoint.get('/api/products');
      expect(response.status).toBe(200);
      done();

    });


    it('Test get specific product method', async (done) => {
        
      const response = await endPoint.get('/api/products/1');
      expect(response.status).toBe(200);
      done();

    });



    it('Test create product method', async (done) => {
        
      const response = await endPoint.post('/api/products');
      expect(response.status).toBe(200);
      done();

    });

  });
  
  

});