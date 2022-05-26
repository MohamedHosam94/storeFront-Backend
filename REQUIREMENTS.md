# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 



## API Endpoints

#### Products

- Index method to show all products 
HTTP verb GET - url: ('/api/products')

- Show
HTTP verb GET - url: ('/api/products/{:productID}')

- Create [token required]
HTTP verb POST - url: ('/api/products')
token is send in header as a Authorization = jwt {token}

- delete method is added just for demonstration but it needs admin dashboard since this is storeFront project



#### Users

[token] is returned in response after authenticate user url [ LOGIN ]

##### Index [token required]
HTTP verb GET - url: ('/api/users')
token is send in header as a Authorization = jwt {token}

##### Show [token required]
HTTP verb GET - url: ('/api/users/{:userID}')
token is send in header as a Authorization = jwt {token}

##### Create
HTTP verb POST - url: ('/api/users')
token is send in header as a Authorization = jwt {token}

first_name is send in request body
last_name is send in request body
email is send in request body
password is send in request body


##### Update [token required]
HTTP verb PATCH - url: ('/api/users/{:userID}')
token is send in header as a Authorization = jwt {token}

first_name is send in request body
last_name is send in request body
email is send in request body
password is send in request body



##### Destroy [token required]
HTTP verb DELETE - url: ('/api/users/{:userID}')
token is send in header as a Authorization = jwt {token}


##### Login
HTTP verb POST - url: ('/api/users/authenticate')
token is send in header as a Authorization = jwt {token}

email is send in request body
password is send in request body

[token] is returned in response after authenticate 


#### Orders

-INDEX - ALl orders for user [token required]
 HTTP verb GET - url: ('/api/users/{:userId}/orders')
token is send in header as a Authorization = jwt {token}


-SHOW -  Specific order for user [token required]
 HTTP verb GET - url: ('/api/users/{:userId}/orders/{:orderId}')
token is send in header as a Authorization = jwt {token}


-Create - order for user [token required]
HTTP verb POST - url: ('/api/users/{:userId}/orders')
token is send in header as a Authorization = jwt {token}


-UPDATE - order for user [token required]
HTTP verb PATCH - url: ('/api/users/{:userId}/orders/{:orderId}')
token is send in header as a Authorization = jwt {token}

orderStatus is send in request body as 'open' or 'closed'

#### ADD To Cart

-Add To Cart for user [token required]
HTTP verb POST - url: ('/api/users/{:userId}/orders/{:orderId}/cart')
token is send in header as a Authorization = jwt {token}

productId is send in request body
quantity is send in request body


-Remove From Cart for user [token required]
HTTP verb DELETE - url: ('/api/users/{:userId}/orders/{:orderId}/cart/{:cartId}')
token is send in header as a Authorization = jwt {token}


## Data Shapes

#### Products 
- id
Primary key

- name 
colomn type is VARCHAR(100)

- price
colomn type is FLOAT

- [OPTIONAL] category


#### Users
- id
Key

first_name 
colomn type is VARCHAR(50)

last_name
colomn type is VARCHAR(50)
    
email
colomn type is VARCHAR(255) UNIQUE

password
colomn type is VARCHAR(255) NOT NULL

#### Orders

- id
Primary Key

status
colomn Type is VARCHAR(100)

price 
colomn Type is FLOAT,

user_id
colomn Type is bigint and REFERENCES users(id) as [foreign key]



#### Order_Products
This is pivot table between orders and products because the relation between them is 
many to many

id 
SERIAL PRIMARY KEY,

quantity 
colomn type is INT,
  
order_id 
colomn type is bigint and REFERENCES orders(id) as [Foreign key],

product_id 
colomn type is bigint and REFERENCES products(id) as [Foreign key]

