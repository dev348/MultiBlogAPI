import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

export const app = express();

app.use(helmet());

app.use(
    bodyParser.urlencoded({
        extended:true
    })
);

app.use(bodyParser.json());

