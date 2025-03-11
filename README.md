# JKTECH Backend

A NestJS backend Application for user authentication, document management, and ingestion controls based on roles along with Authentication and Authorization.

## Features

- Authentication with JWT - User can Register,Log in and Log out securely using JWT Tokens,
                            Pass are encrypted using bycrpt hashing before storing in the DB,
                            Tokens are used for stateless session management and can be verified via HTTP headers.
- Role-based access control (Admin, Editor, Viewer) - Each user having the one of the following roles mentioned.
                                                     Decoraters and guards(eg @Roles and RolesGuard) verifies access
                                                     Restriction based on the role.
- Document management with file uploads - Include file validation and storaage logic.
- Integration with Python backend for document ingestion - Editors and Admin can trigger document ingestion using API.
                                                         This sends a POST request to Python backend via AXIOS.
- User management for administrators - Access has been given only to Admin role to manage role updation for other users.
- Guards & Authorization layer - Global JwtAuthGuard ensures all routes are protected.
                            RolesGuard dynamically checks and allowed roles for each endpoints using decorators.
- Moduler & Scalable Architecture - Clean separation of application with feature-based modules.
                                    

## Prerequisites

- Node.js >= 14
- PostgreSQL
- Python backend service (for ingestion)

## Installation

```bash
npm install
```

## Configuration

Create `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/sustvest
JWT_SECRET=your-secret-key
PYTHON_BACKEND_URL=http://localhost:5000
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## API Endpoints

### Authentication
- POST `/auth/register` - API for Registring the new USER.
- POST `/auth/login` - Login Api which takes mail and pass and will generate the access token.
- POST `/auth/logout` - Api for Log out, since the token is stateless so it will simply log out the user on hitting the API.

### User Management
- PUT `/users/:id/role` - By paasing the ID the Role can be updated for any of the features. (Admin only)

### Documents
- POST `/documents` - Upload new document and will create the entry in Uploads folder in Diskstorage.
- GET `/documents` - List all documents which have been uploaded.
- DELETE `/documents/:id` - Delete document by passing ID.

### Ingestion
- POST `/ingestion/trigger` - Trigger document ingestion
- GET `/ingestion/status` - Check ingestion status

## Role Permissions

- Admin: Full system access including role updation for other users
- Editor: Can only upload document and trigger ingestion
- Viewer: have only Read access throughout the application.

## Folder Structure

src/
├── auth/              # Authentication (JWT, strategies, guards)
├── users/             # User entity, controller, service
├── documents/         # Document controller & service (upload/delete)
├── ingestion/         # Ingestion service for calling Python backend
├── common/            # Custom decorators, guards (RolesGuard)
├── main.ts            # Entry point
└── app.module.ts      # Root module

## License

MIT