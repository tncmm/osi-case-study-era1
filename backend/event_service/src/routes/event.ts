import express, { Request, Response } from 'express';
import EventManager from '../business/event';
import { CreateEventDTO, UpdateEventDTO, AddCommentDTO, AddParticipantDTO } from '../domain/dtos/event';

const router: express.Router = express.Router();

router.post(
    '/create',
    async (req: Request, res: Response) => {
        const event = await new EventManager().createEvent(
            req.body as CreateEventDTO
        );
        res.send({ event });
    }
);

router.put(
    '/:id',
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
    async (req: Request, res: Response) => {
        const event = await new EventManager().getEvent(req.params.id);
        res.send({ event });
    }
);

router.get(
    '/',
    async (_req: Request, res: Response) => {
        const events = await new EventManager().getAllEvents();
        res.send({ events });
    }
);

router.post(
    '/:id/comment',
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
    async (req: Request, res: Response) => {
        const participant = await new EventManager().addParticipant({
            eventId: req.params.id,
            ...req.body
        } as AddParticipantDTO);
        res.send({ participant });
    }
);

router.delete(
    '/:id',
    async (req: Request, res: Response) => {
        await new EventManager().deleteEvent(req.params.id);
        res.send({ success: true });
    }
);

export default router; 