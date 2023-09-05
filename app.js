import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { connectDB } from './src/mongo/connection.js';
import blogRoutes from './src/service/blogRoutes.js'


export const app = express();

connectDB()

app.use(helmet());



app.use(
    bodyParser.urlencoded({
        extended:true
    })
);

app.use(bodyParser.json());

app.use('/api',blogRoutes)