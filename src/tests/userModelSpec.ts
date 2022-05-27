import { UserModel , User} from '../models/userModel';

const user = new UserModel();

describe("User Model", () => {
  it('should have an index method', () => {
    expect(user.index).toBeDefined();
  });


  it('should have a create method', () => {
    expect(user.create).toBeDefined();
  });


  it('should have a show method', () => {
    expect(user.show).toBeDefined();
  });


  it('should have an update method', () => {
    expect(user.update).toBeDefined();
  });


  it('should have a delete method', () => {
    expect(user.delete).toBeDefined();
  });


  it('should have an authenticate method', () => {
    expect(user.authenticate).toBeDefined();
  });




  it('Create method should create a user', async () => {
    
    const result = await user.create({
      first_name: 'Mo',
      last_name: 'Neny',
      email: 'test@email.com',
      password: '1234'
    });

    expect(result).toEqual({
      id: result.id,
      first_name: 'Mo',
      last_name: 'Neny',
      email: 'test@email.com'
    });
  });



  it('Index method should get All users', async () => { 
    const result = await user.index();

    expect(result.length).toBeGreaterThanOrEqual(2);
  });


  it('Show method should get one user', async () => { 
    const result = await user.show('1');

    expect(result).toEqual({
      id: 1,
      first_name: result.first_name,
      last_name: result.last_name,
      email: result.email
    });
  });




  it('Update method should update a user', async () => {
    
    const result = await user.update({
      id: 1,
      first_name: 'Mo',
      last_name: 'Neny',
      email: 'testUpdated@email.com',
      password: '1234'
    });

    expect(result).toEqual({
      id: result.id,
      first_name: 'Mo',
      last_name: 'Neny',
      email: 'testUpdated@email.com'
    });
  });



  it('Authenticate method should return a null if email is wrong', async () => {
    
    const result = await user.authenticate('wrongEmail@email.com' , '1234');

     expect(result).toBeNull();
  });




  it('Delete method should delete a user', async () => {
    
    const result = await user.delete('1');

    expect(result).toBeUndefined();
  });



});