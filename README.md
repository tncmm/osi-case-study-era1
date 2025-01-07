# Event Planning Application

## Overview
This application is a comprehensive event management platform built with a microservices architecture. It enables users to create, manage, and participate in events while providing a robust authentication system and real-time event management capabilities.

## Architecture

### Frontend (React.js + TypeScript)
- **Technology Stack:**
  - React.js with TypeScript
  - Redux Toolkit for state management
  - Material-UI (MUI) for UI components
  - Vite as build tool
  - Axios for API communication
  - React Router for navigation
  - Formik + Yup for form handling and validation

### Backend Microservices

#### 1. Authentication Service
- **Technology:** Node.js + Express.js
- **Database:** PostgreSQL (via Prisma ORM)
- **Features:**
  - User registration and login
  - JWT-based authentication
  - Profile management
  - Role-based authorization (USER, ADMIN)
- **Key Endpoints:**
  - POST `/authentication/register` - User registration
  - POST `/authentication/login` - User login
  - PUT `/authentication/update` - Profile update

#### 2. Event Service
- **Technology:** Node.js + Express.js
- **Database:** MongoDB (via Prisma ORM)
- **Features:**
  - Event CRUD operations
  - Comment management
  - Participant management
- **Key Endpoints:**
  - GET `/events` - List all events
  - GET `/events/:id` - Get event details
  - POST `/events/create` - Create new event
  - PUT `/events/:id` - Update event
  - DELETE `/events/:id` - Delete event
  - POST `/events/:id/comment` - Add comment
  - POST `/events/:id/participant` - Join event
  - DELETE `/events/:id/participant` - Leave event

## Security Features
- JWT-based authentication
- Role-based access control
- Password hashing using bcrypt
- CORS protection
- Request validation using Joi
- Error handling middleware
- Secure HTTP headers

## Database Design

### Authentication Service (PostgreSQL)
- **Users Table:**
  - id (Primary Key)
  - name
  - surname
  - email
  - phoneNumber
  - password (hashed)
  - role (USER/ADMIN)
  - status (ACTIVE/PASSIVE)
  - createdAt
  - updatedAt

### Event Service (MongoDB)
- **Events Collection:**
  - id
  - title
  - description
  - date
  - location
  - userId (creator)
  - comments (array)
  - participants (array)
  - createdAt
  - updatedAt

- **Comments Collection:**
  - id
  - content
  - userId
  - eventId
  - createdAt

- **Participants Collection:**
  - id
  - userId
  - eventId
  - createdAt

## API Communication
- Services communicate via RESTful APIs
- Cross-Origin Resource Sharing (CORS) enabled for frontend communication
- Consistent error handling across services
- Standardized response format:
  ```json
  {
    "isError": boolean,
    "data": object,
    "error": {
      "code": number,
      "message": string
    }
  }
  ```

## Deployment
- Frontend deployed on Render: https://osi-case-study-era1.onrender.com
- Auth Service: https://osi-case-study-era1-1-auth.onrender.com
- Event Service: https://osi-case-study-era1-1-event.onrender.com

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies for each service
```bash
# Frontend
cd frontend
npm install

# Auth Service
cd backend/auth_service
npm install

# Event Service
cd backend/event_service
npm install
```

3. Set up environment variables
Create `.env` files in each service directory with the following variables:

```env
# Auth Service
DATABASE_URL=postgresql://[username]:[password]@localhost:5432/auth_db
JWT_PRIVATE_KEY=your_jwt_secret
PORT=3001

# Event Service
DATABASE_URL=mongodb://[username]:[password]@localhost:27017/event_db
JWT_PRIVATE_KEY=your_jwt_secret
PORT=3002
```

4. Run the services
```bash
# Frontend
npm run dev

# Auth Service
npm run start

# Event Service
npm run start
```

## Features Implementation Status

### Core Features ✅
- User authentication (register, login)
- Event management (CRUD operations)
- Event participation
- Comment system
- User profile management

### Additional Features 🚀
- Role-based access control
- Real-time validation
- Responsive UI
- Error handling
- Cross-service communication

## Future Enhancements
- Real-time notifications
- Event categories and tags
- Search and filtering capabilities
- User avatars and media uploads
- Event reminders
- Social sharing features

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

