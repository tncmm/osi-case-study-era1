import express, { Request, Response } from 'express';

const router: express.Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.send('SERVER IS ALIVE');
});

export default router;