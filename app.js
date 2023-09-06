import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors'

import { connectDB } from './src/mongo/connection.js';
import blogRoutes from './src/service/blogRoutes.js'

export const app = express();
app.use(helmet());
app.use(cors());


app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

connectDB()


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

app.use('/api', blogRoutes);
