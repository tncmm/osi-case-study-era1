import express, { Request, Response } from 'express';
import EventManager from '../business/event';
import { CreateEventDTO, UpdateEventDTO, AddCommentDTO, AddParticipantDTO } from '../domain/dtos/event';
import { authorize } from '../middleware/authorize';
import { requestValidator } from '../middleware/request_validator';
import { CreateEventSchema, UpdateEventSchema, AddCommentSchema, AddParticipantSchema } from '../domain/schemas/event';

const router: express.Router = express.Router();

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

router.get(
    '/:id',
    authorize(['USER', 'ADMIN']),
    async (req: Request, res: Response) => {
        const event = await new EventManager().getEvent(req.params.id);
        res.send({ event });
    }
);

router.get(
    '/',
    authorize(['USER', 'ADMIN']),
    async (_req: Request, res: Response) => {
        const events = await new EventManager().getAllEvents();
        res.send({ events });
    }
);

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

router.delete(
    '/:id',
    authorize(['USER', 'ADMIN']),
    async (req: Request, res: Response) => {
        await new EventManager().deleteEvent(req.params.id);
        res.send({ message: 'Event deleted successfully' });
    }
);

export default router; 