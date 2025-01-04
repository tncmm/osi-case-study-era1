import express, { Request, Response } from 'express';
import { RegisterDTO, } from '../domain/dtos/authentication';
import UserAuthenticationManager from '../business/authentication';

const router: express.Router = express.Router();

router.post(
    '/register',
    async (req: Request, res: Response) => {

        const user = await new UserAuthenticationManager().register(
            req.body as RegisterDTO
        );

        res.send({ user });
    }
);

router.post(
    '/login',
    async (req: Request, res: Response) => {
        const user = await new UserAuthenticationManager().loginWithEmail(req.body);

        res.send(user);
    }
);


export default router;