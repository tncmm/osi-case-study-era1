import express from 'express';
require('express-async-errors');
import { config } from './config/config';
import { setRoutes } from './startup/routes';


const app: express.Application = express();
const port: number = config.port;

setRoutes(app);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}



export default app;