import db from './db';
import { BusinessError } from '../domain/error/business_error';

export interface EventCreationParams {
    title: string;
    description: string;
    date: Date;
    location: string;
    userId: string;
}

export interface EventUpdateParams {
    id: string;
    title?: string;
    description?: string;
    date?: Date;
    location?: string;
}

export interface CommentCreationParams {
    eventId: string;
    userId: string;
    content: string;
}

export interface ParticipantCreationParams {
    eventId: string;
    userId: string;
}

export class EventDbManager {
    create = async ({ title, description, date, location, userId }: EventCreationParams) => {
        return await db.event.create({
            data: {
                title,
                description,
                date,
                location,
                userId
            },
            include: {
                comments: true,
                participants: true
            }
        });
    };

    update = async ({ id, title, description, date, location }: EventUpdateParams) => {
        return await db.event.update({
            where: { id },
            data: {
                title,
                description,
                date,
                location
            },
            include: {
                comments: true,
                participants: true
            }
        });
    };

    findById = async (id: string) => {
        return await db.event.findUnique({
            where: { id },
            include: {
                comments: true,
                participants: true
            }
        });
    };

    findAll = async () => {
        return await db.event.findMany({
            include: {
                comments: true,
                participants: true
            }
        });
    };

    addComment = async ({ eventId, userId, content }: CommentCreationParams) => {
        return await db.comment.create({
            data: {
                content,
                userId,
                eventId
            }
        });
    };

    addParticipant = async ({ eventId, userId }: ParticipantCreationParams) => {
        const existingParticipant = await db.participant.findFirst({
            where: {
                eventId,
                userId
            }
        });

        if (existingParticipant) {
            throw new BusinessError('user-already-participant');
        }

        return await db.participant.create({
            data: {
                userId,
                eventId
            }
        });
    };

    delete = async (id: string) => {
        return await db.event.delete({
            where: { id }
        });
    };
} 