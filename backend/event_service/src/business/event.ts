import { EventDbManager } from '../database/event';
import { NotFound } from '../domain/error/not_found';

export interface CreateEventParams {
    title: string;
    description: string;
    date: Date;
    location: string;
    userId: number;
}

export interface UpdateEventParams {
    id: string;
    title?: string;
    description?: string;
    date?: Date;
    location?: string;
}

export interface AddCommentParams {
    eventId: string;
    userId: number;
    content: string;
}

export interface AddParticipantParams {
    eventId: string;
    userId: number;
}

export interface RemoveParticipantParams {
    eventId: string;
    userId: number;
}

export default class EventManager {
    async createEvent({
        title,
        description,
        date,
        location,
        userId
    }: CreateEventParams) {
        return await new EventDbManager().create({
            title,
            description,
            date,
            location,
            userId
        });
    }

    async updateEvent({
        id,
        title,
        description,
        date,
        location
    }: UpdateEventParams) {
        const event = await new EventDbManager().findById(id);
        
        if (!event) {
            throw new NotFound('event-not-found');
        }

        return await new EventDbManager().update({
            id,
            title,
            description,
            date,
            location
        });
    }

    async getEvent(id: string) {
        const event = await new EventDbManager().findById(id);
        
        if (!event) {
            throw new NotFound('event-not-found');
        }

        return event;
    }

    async getAllEvents() {
        const events = await new EventDbManager().findAll();
        if (!events) {
           return [];
        }
        return events;
    }

    async addComment({
        eventId,
        userId,
        content
    }: AddCommentParams) {
        const event = await new EventDbManager().findById(eventId);
        
        if (!event) {
            throw new NotFound('event-not-found');
        }

        return await new EventDbManager().addComment({
            eventId,
            userId,
            content
        });
    }

    async addParticipant({
        eventId,
        userId
    }: AddParticipantParams) {
        const event = await new EventDbManager().findById(eventId);
        
        if (!event) {
            throw new NotFound('event-not-found');
        }

        return await new EventDbManager().addParticipant({
            eventId,
            userId
        });
    }

    async removeParticipant({
        eventId,
        userId
    }: RemoveParticipantParams) {
        const event = await new EventDbManager().findById(eventId);
        
        if (!event) {
            throw new NotFound('event-not-found');
        }

        return await new EventDbManager().removeParticipant({
            eventId,
            userId
        });
    }

    async deleteEvent(id: string) {
        const event = await new EventDbManager().findById(id);
        
        if (!event) {
            throw new NotFound('event-not-found');
        }

        return await new EventDbManager().delete(id);
    }
} 