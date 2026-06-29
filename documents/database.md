# Database Documentation

## Database
The project uses PostgreSQL with Prisma ORM.

## Models
- User
- Task
- TokenStorage

## Notes
- `createdAt` is auto-generated with Prisma.
- `updatedAt` is auto-updated by Prisma.
- Tasks are linked to users through a foreign key relation.