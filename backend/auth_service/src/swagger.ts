import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Authentication Service API',
      version: '1.0.0',
      description: 'API documentation for the Authentication Service',
    },
    servers: [
      {
        url: 'https://osi-case-study-era1-1-auth.onrender.com',
        description: 'Production server',
      },
      {
        url: 'http://localhost:3001',
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
        RegisterRequest: {
          type: 'object',
          required: ['name', 'surname', 'email', 'phoneNumber', 'password'],
          properties: {
            name: { type: 'string', example: 'John' },
            surname: { type: 'string', example: 'Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            phoneNumber: { type: 'string', example: '+1234567890' },
            password: { type: 'string', format: 'password', example: 'password123' },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            password: { type: 'string', format: 'password', example: 'password123' },
          },
        },
        UpdateUserRequest: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'John' },
            surname: { type: 'string', example: 'Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            phoneNumber: { type: 'string', example: '+1234567890' },
          },
        },
        UserResponse: {
          type: 'object',
          properties: {
            userId: { type: 'integer', example: 1 },
            email: { type: 'string', example: 'john@example.com' },
            phone: { type: 'string', example: '+1234567890' },
            name: { type: 'string', example: 'John' },
            surname: { type: 'string', example: 'Doe' },
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          },
        },
        UserDetailsResponse: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'John' },
            surname: { type: 'string', example: 'Doe' },
            email: { type: 'string', example: 'john@example.com' },
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
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

export const specs = swaggerJsdoc(options); 