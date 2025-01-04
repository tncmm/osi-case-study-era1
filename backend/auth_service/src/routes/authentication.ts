import express, { Request, Response } from 'express';
import { RegisterDTO, } from '../domain/dtos/authentication';
import UserAuthenticationManager from '../business/authentication';
import { requestValidator } from '../middleware/request_validator';
import {EmailLoginSchema,RegisterSchema,} from '../domain/schemas/authentication';
    
const router: express.Router = express.Router();

router.post(
    '/register',
    requestValidator(RegisterSchema),
    async (req: Request, res: Response) => {

        const user = await new UserAuthenticationManager().register(
            req.body as RegisterDTO);
        res.send({ user });
    }
);

router.post(
    '/login',
    requestValidator(EmailLoginSchema),
    async (req: Request, res: Response) => {
        const user = await new UserAuthenticationManager().loginWithEmail(req.body);
        res.send(user);
    }
);


export default router;