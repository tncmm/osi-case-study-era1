import Joi from 'joi';

export const CreateEventSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(1000).required(),
    date: Joi.date().required(),
    location: Joi.string().max(200).required(),
    userId: Joi.number().required()
});

export const UpdateEventSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().max(100),
    description: Joi.string().min(10).max(1000),
    date: Joi.date(),
    location: Joi.string().max(200)
});

export const AddCommentSchema = Joi.object({
    userId: Joi.number().required(),
    content: Joi.string().max(500).required()
});

export const AddParticipantSchema = Joi.object({
    userId: Joi.number().required()
}); 