import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import dotenvFlow from 'dotenv-flow';
import initWebRoutes from './routes/web';
import viewEngine from './config/viewEngine';
import connectDB from './config/connectDB';

dotenvFlow.config();

const app = express();
const port = process.env.PORT || 7777;

// config app
// middleware: parse body
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(cors({ origin: true }));

viewEngine(app);
initWebRoutes(app);

// connect to DB
connectDB();

const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

module.exports = { app, server };
