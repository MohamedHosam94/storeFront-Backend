import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/main';
// import db from './database';

const app: express.Application = express();
const address: string = '127.0.0.1:3000';

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.use('/api' , routes);

// db.connect().then((client) => {
//   return client
//     .query('SELECT * FROM test123')
//     .then((res) => {
//       client.release();
//       console.log(res.rows , 'woooow');
//     })
//     .catch((err) => {
//       client.release();
//       console.log(err.stack , 'errorrrrr');
//     });
// });

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;