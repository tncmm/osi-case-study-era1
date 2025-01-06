import express from 'express';
import cors from 'cors';
import { setRoutes } from './startup/routes';

const app = express();

app.use(cors());
setRoutes(app);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Event service running on port ${PORT}`);
}); 