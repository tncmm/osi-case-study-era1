import express, { Request, Response } from 'express';
import EventManager from '../business/event';
import { CreateEventDTO, UpdateEventDTO, AddCommentDTO, AddParticipantDTO } from '../domain/dtos/event';
import { authorize } from '../middleware/authorize';
import { requestValidator } from '../middleware/request_validator';
import { CreateEventSchema, UpdateEventSchema, AddCommentSchema, AddParticipantSchema } from '../domain/schemas/event';

const router: express.Router = express.Router();

/**
 * @swagger
 * /events/create:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventRequest'
 *     responses:
 *       200:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   $ref: '#/components/schemas/EventResponse'
 */
router.post(
    '/create',
    authorize(['USER', 'ADMIN']),
    requestValidator(CreateEventSchema),
    async (req: Request, res: Response) => {
        const event = await new EventManager().createEvent(
            req.body as CreateEventDTO
        );
        res.send({ event });
    }
);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEventRequest'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   $ref: '#/components/schemas/EventResponse'
 */
router.put(
    '/:id',
    authorize(['USER', 'ADMIN']),
    requestValidator(UpdateEventSchema),
    async (req: Request, res: Response) => {
        const event = await new EventManager().updateEvent({
            id: req.params.id,
            ...req.body
        } as UpdateEventDTO);
        res.send({ event });
    }
);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   $ref: '#/components/schemas/EventResponse'
 */
router.get(
    '/:id',
    authorize(['USER', 'ADMIN']),
    async (req: Request, res: Response) => {
        const event = await new EventManager().getEvent(req.params.id);
        res.send({ event });
    }
);

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EventResponse'
 */
router.get(
    '/',
    authorize(['USER', 'ADMIN']),
    async (_req: Request, res: Response) => {
        const events = await new EventManager().getAllEvents();
        res.send({ events });
    }
);

/**
 * @swagger
 * /events/{id}/comment:
 *   post:
 *     summary: Add a comment to an event
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddCommentRequest'
 *     responses:
 *       200:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     content:
 *                       type: string
 *                     userId:
 *                       type: integer
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 */
router.post(
    '/:id/comment',
    authorize(['USER', 'ADMIN']),
    requestValidator(AddCommentSchema),
    async (req: Request, res: Response) => {
        const comment = await new EventManager().addComment({
            eventId: req.params.id,
            ...req.body
        } as AddCommentDTO);
        res.send({ comment });
    }
);

/**
 * @swagger
 * /events/{id}/participant:
 *   post:
 *     summary: Add a participant to an event
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddParticipantRequest'
 *     responses:
 *       200:
 *         description: Participant added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 participant:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     userId:
 *                       type: integer
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 */
router.post(
    '/:id/participant',
    authorize(['USER', 'ADMIN']),
    requestValidator(AddParticipantSchema),
    async (req: Request, res: Response) => {
        const participant = await new EventManager().addParticipant({
            eventId: req.params.id,
            ...req.body
        } as AddParticipantDTO);
        res.send({ participant });
    }
);

/**
 * @swagger
 * /events/{id}/participant:
 *   delete:
 *     summary: Remove current user from event participants
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Participation cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete(
    '/:id/participant',
    authorize(['USER', 'ADMIN']),
    async (req: Request, res: Response) => {
        await new EventManager().removeParticipant({
            eventId: req.params.id,
            userId: req.user.userId
        });
        res.send({ message: 'Participation cancelled successfully' });
    }
);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete(
    '/:id',
    authorize(['USER', 'ADMIN']),
    async (req: Request, res: Response) => {
        await new EventManager().deleteEvent(req.params.id);
        res.send({ message: 'Event deleted successfully' });
    }
);

export default router; 