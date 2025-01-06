export interface CreateEventDTO {
    title: string;
    description: string;
    date: Date;
    location: string;
    userId: number;
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
    userId: number;
    content: string;
}

export interface AddParticipantDTO {
    eventId: string;
    userId: number;
} 