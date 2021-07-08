import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

//
config();

import routes from './routes.js';

const port = process.env.PORT || 3000;

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log('Listening on port ', port);
});