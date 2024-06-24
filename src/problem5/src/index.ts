import express, { Express, Handler, Request, Response, Router } from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import postRoute from './routes/post.route';

import { serve, setup } from 'swagger-ui-express';
const swaggerDocument = require('../build/swagger.json');

config();

const app: Express = express();

const PORT = process.env.PORT_MONGO || '7777';

mongoose
  .connect(process.env.MONGODB_URL || '')
  .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Nam xin chao');
});

app.use('/posts', postRoute);

var options = {
  explorer: true
};

app.use('/docs', serve, setup(swaggerDocument, options));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
