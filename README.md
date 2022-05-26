
# Storefront Backend Project

## Getting Started

This project is a storeFront backend 

## Required Technologies

nodejs version used is v14.17.5

technologies used is typecript , postgreSQL as a database , 

all the dependencies for the project can be found in package.json file 

run -  npm install to download all node modules 



## How to setup and connect to the database

.env file should be created and the following varaiables is added to it

There is two databases required for development and testing 


The development version database name should be added in a POSTGRES_DB varaiable

like so : POSTGRES_DB=storeFront_dev


The testing version database name should be added in a POSTGRES_DB_TEST varaiable

like so : POSTGRES_DB_TEST=storeFront_test


### The ports database is working on

The database server host should be added to variable like so : POSTGRES_HOST=localhost

The database server port should be added to variable like so : POSTGRES_PORT=5432


The database server username should be added to variable like so : POSTGRES_USER=postgres

The database server password should be added to variable like so : POSTGRES_PWD=1234



## The Remaining Env Variables for hashing & Env Mode

The hashing for bcrypt are added like so :   BCRYPT_PWD=addYourSecret

The hashing salt are added like so       :   SALT_ROUNDS=10

The token secret are added like so       :   TOKEN_SECRET=token

The env mode are added like so           :   ENV=dev


### The backend server is working on port   - 3000

### The database server is working on port  - 5432