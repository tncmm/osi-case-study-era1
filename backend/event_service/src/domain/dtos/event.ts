export interface CreateEventDTO {
    title: string;
    description: string;
    date: Date;
    location: string;
    userId: string;
}

export interface UpdateEventDTO {
    id: string;
    title?: string;
    description?: string;
    date?: Date;
    location?: string;
}

export interface AddCommentDTO {
    eventId: string;
    userId: string;
    content: string;
}

export interface AddParticipantDTO {
    eventId: string;
    userId: string;
} 