import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Event Service API',
      version: '1.0.0',
      description: 'API documentation for the Event Service',
    },
    servers: [
      {
        url: 'https://osi-case-study-era1-1-event.onrender.com',
        description: 'Production server',
      },
      {
        url: 'http://localhost:3002',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        CreateEventRequest: {
          type: 'object',
          required: ['title', 'description', 'date', 'location', 'userId'],
          properties: {
            title: { type: 'string', example: 'Tech Conference 2024' },
            description: { type: 'string', example: 'Annual technology conference' },
            date: { type: 'string', format: 'date-time', example: '2024-06-15T09:00:00Z' },
            location: { type: 'string', example: 'San Francisco Convention Center' },
            userId: { type: 'integer', example: 1 },
          },
        },
        UpdateEventRequest: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Updated Tech Conference 2024' },
            description: { type: 'string', example: 'Updated conference details' },
            date: { type: 'string', format: 'date-time', example: '2024-06-16T09:00:00Z' },
            location: { type: 'string', example: 'New Location' },
          },
        },
        AddCommentRequest: {
          type: 'object',
          required: ['content', 'userId'],
          properties: {
            content: { type: 'string', example: 'Great event!' },
            userId: { type: 'integer', example: 1 },
          },
        },
        AddParticipantRequest: {
          type: 'object',
          required: ['userId'],
          properties: {
            userId: { type: 'integer', example: 1 },
          },
        },
        EventResponse: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            title: { type: 'string', example: 'Tech Conference 2024' },
            description: { type: 'string', example: 'Annual technology conference' },
            date: { type: 'string', format: 'date-time', example: '2024-06-15T09:00:00Z' },
            location: { type: 'string', example: 'San Francisco Convention Center' },
            userId: { type: 'integer', example: 1 },
            comments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: '507f1f77bcf86cd799439012' },
                  content: { type: 'string', example: 'Great event!' },
                  userId: { type: 'integer', example: 1 },
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', example: 1 },
                      name: { type: 'string', example: 'John' },
                      surname: { type: 'string', example: 'Doe' },
                      email: { type: 'string', example: 'john@example.com' }
                    }
                  },
                  createdAt: { type: 'string', format: 'date-time' },
                },
              },
            },
            participants: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: '507f1f77bcf86cd799439013' },
                  userId: { type: 'integer', example: 1 },
                  createdAt: { type: 'string', format: 'date-time' },
                },
              },
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            isError: { type: 'boolean', example: true },
            success: { type: 'object' },
            error: {
              type: 'object',
              properties: {
                code: { type: 'integer', example: 400 },
                message: { type: 'string', example: 'Invalid parameters' },
              },
            },
          },
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

export const specs = swaggerJsdoc(options); 