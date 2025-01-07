import express, { Request, Response } from 'express';
import { RegisterDTO } from '../domain/dtos/authentication';
import UserAuthenticationManager from '../business/authentication';
import { requestValidator } from '../middleware/request_validator';
import { EmailLoginSchema, RegisterSchema, UpdateUserSchema } from '../domain/schemas/authentication';
import { authorize } from '../middleware/authorize';
import { UserRole } from '@prisma/client';

const router: express.Router = express.Router();

/**
 * @swagger
 * /authentication/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Invalid parameters or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
    '/register',
    requestValidator(RegisterSchema),
    async (req: Request, res: Response) => {
        const user = await new UserAuthenticationManager().register(
            req.body as RegisterDTO);
        res.send({ user });
    }
);

/**
 * @swagger
 * /authentication/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
    '/login',
    requestValidator(EmailLoginSchema),
    async (req: Request, res: Response) => {
        const user = await new UserAuthenticationManager().loginWithEmail(req.body);
        res.send(user);
    }
);

/**
 * @swagger
 * /authentication/update:
 *   put:
 *     summary: Update user profile
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put(
    '/update',
    authorize([UserRole.USER, UserRole.ADMIN]),
    requestValidator(UpdateUserSchema),
    async (req: Request, res: Response) => {
        const result = await new UserAuthenticationManager().update({
            userId: req.user.userId,
            ...req.body
        });
        res.send({ success: result });
    }
);

/**
 * @swagger
 * /authentication/user/{id}:
 *   get:
 *     summary: Get user details by ID
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/UserDetailsResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 */
router.get(
    '/user/:id',
    async (req: Request, res: Response) => {
        const user = await new UserAuthenticationManager().getUserData({
            userId: parseInt(req.params.id)
        });
        if (!user) {
            res.status(404).send({ message: 'User not found' });
            return;
        }
        res.send({ 
            user: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email
            } 
        });
    }
);

export default router;