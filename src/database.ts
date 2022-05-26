import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PWD, POSTGRES_DB_TEST, ENV } =
  process.env;


// Client ENV Type;

console.log(`----------- This is ${ENV} Client --------------`);


let client: Pool;


if (ENV === 'test') {
 client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PWD
  });
} else {
 client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PWD,
  });
}

// console.log(POSTGRES_HOST , POSTGRES_DB , POSTGRES_USER , POSTGRES_PWD);

client.on('error', (err: Error) => {
  console.error(err.message);
});


export default client;
