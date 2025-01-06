import Joi from 'joi';

export const CreateEventSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(1000).required(),
    date: Joi.date().greater('now').required(),
    location: Joi.string().min(5).max(200).required(),
    userId: Joi.string().required()
});

export const UpdateEventSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(10).max(1000),
    date: Joi.date().greater('now'),
    location: Joi.string().min(5).max(200)
});

export const AddCommentSchema = Joi.object({
    eventId: Joi.string().required(),
    userId: Joi.string().required(),
    content: Joi.string().min(1).max(500).required()
});

export const AddParticipantSchema = Joi.object({
    eventId: Joi.string().required(),
    userId: Joi.string().required()
}); 