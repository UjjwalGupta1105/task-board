# Agent Guidelines for Task Board

## Project Overview
This is a Node.js/Express REST API with TypeScript, Sequelize ORM, and MySQL. It follows a layered architecture: Controller -> Service -> Repository.

## Build/Lint/Test Commands

```bash
# Development
npm run dev          # Run with nodemon (auto-restart on changes)

# Production
npm start             # Run with ts-node

# Linting
npx eslint src/       # Lint the source directory
npx eslint src/**/*.ts # Lint specific files

# Type checking
npx tsc --noEmit      # Type check without emitting files
```

No test framework is currently configured.

## Code Style Guidelines

### TypeScript Configuration
- Target: ES2016
- Module: CommonJS
- Strict mode enabled
- All strict type checking options enabled

### Formatting
- **Indentation:** 4 spaces (enforced by ESLint)
- **Quotes:** Single quotes (warn)
- **Semicolons:** Required (enforced by ESLint)
- **Line endings:** OS-default (Windows uses CRLF)

### Naming Conventions
- **Classes:** PascalCase (`UserRepository`, `AuthService`)
- **Variables/Functions:** camelCase (`createService`, `findByEmail`)
- **Constants:** SCREAMING_SNAKE_CASE (`PORT`, `JWT_SECRET`, `DB_HOST`)
- **Files:** kebab-case (`auth.controller.ts`, `user.repository.ts`, `app.error.ts`)
- **Types/Interfaces:** PascalCase (`RegisterUserDto`, `UserResponse`)

### Import Order (enforced by eslint-plugin-simple-import-sort)
1. Node.js built-ins (`express`, `fs`, etc.)
2. External packages (`zod`, `sequelize`)
3. Internal modules (`../configs/*`, `../repository/*`)
4. Relative imports

```typescript
// Correct import order
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../configs/logger.config';
import UserRepository from '../repository/user.repository';
```

### TypeScript Best Practices
- Use explicit types for function parameters and return types
- Use `interface` for object shapes, `type` for unions/intersections
- Avoid `any` - strict mode is enabled
- Use `unknown` for values of unknown type, then narrow with type guards
- Prefix unused parameters with underscore: `(_req: Request, _next: NextFunction)`

### Error Handling Pattern
Use custom error classes from `src/utils/errors/app.error.ts`:
- `BadRequestError` - 400
- `UnauthorizedError` - 401
- `ForbiddenError` - 403
- `NotFoundError` - 404
- `ConflictError` - 409
- `InternalServerError` - 500
- `NotImplementedError` - 501

```typescript
// Service layer - throw errors
async createService(data: RegisterUserDto): Promise<UserResponse> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
        throw new BadRequestError('User already exists');
    }
    // ...
}

// Controller layer - pass to next()
async function registerHandler(req: Request, res: Response, next: NextFunction) {
    try {
        // handler logic
    } catch (error) {
        logger.error('Error in registerHandler', { error });
        next(error);
    }
}
```

### Sequelize Models
- Use `CreationOptional<T>` for auto-generated fields (id, timestamps)
- Use `InferAttributes<T>` and `InferCreationAttributes<T>` generics
- Use `declare` for model attributes
- Table names should be plural, snake_case: `tableName: 'users'`
- Use hooks for password hashing: `beforeSave`

```typescript
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare fullName: string;
    declare email: string;
    declare password: string;
}
```

### Validation
Use Zod schemas in `src/validators/` for request validation:
```typescript
export const registerSchema = z.object({
    fullName: z.string().min(4).max(50),
    email: z.string().email(),
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    roleId: z.number().nullable().optional()
});
```

### Logging
Use Winston logger from `src/configs/logger.config`:
```typescript
import logger from '../configs/logger.config';
logger.info('Server started');
logger.error('Error occurred', { error, context: 'additional data' });
```

## Project Structure

```
src/
├── configs/          # Configuration (server, db, logger)
├── controllers/      # Request handlers (thin, delegate to services)
├── db/
│   ├── models/       # Sequelize models
│   └── migrations/   # Database migrations
├── dtos/             # Data Transfer Objects
├── middlewares/      # Express middleware (error handlers, etc.)
├── repository/       # Data access layer (BaseRepository pattern)
├── routes/           # API routes (v1 versioning)
├── services/         # Business logic
├── types/            # TypeScript type definitions
├── utils/            # Utilities (auth, errors, helpers)
└── validators/       # Zod validation schemas
```

## API Response Format
```typescript
res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'User Created Successfully',
    data: { /* response data */ },
    error: {}
});
```

## Environment Variables
Required in `.env`:
- `PORT` - Server port
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRES_IN` - Token expiry
- `SALT` - bcrypt salt rounds
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` - MySQL connection
- `FRONTEND_URL` - CORS origin
- `DEV_ENVIRONMENT` - Development mode flag
