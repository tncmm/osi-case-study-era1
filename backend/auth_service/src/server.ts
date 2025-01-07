import express from 'express';
require('express-async-errors');
import { config } from './config/config';
import { setRoutes } from './startup/routes';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger';

const app: express.Application = express();
const port: number = config.port;

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

setRoutes(app);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}

export default app;