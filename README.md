# NestJS + Prisma REST API

A REST API built with NestJS and Prisma ORM, using PostgreSQL.

## Tech Stack

- [NestJS](https://nestjs.com/) - Node.js framework
- [Prisma](https://www.prisma.io/) - ORM & database toolkit
- [PostgreSQL](https://www.postgresql.org/) - Database

## Prerequisites

- Node.js 18+
- PostgreSQL running on `localhost:5433`
- npm

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   Create a `.env` file in the root:

   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5433/nest_prisma"
   ```

3. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

4. **Start the server**

   ```bash
   npm run start:dev
   ```

   The API will be available at `http://localhost:3000`.

## Database Schema

Schema files are located in `prisma/schema/`:

- `base.prisma` — generator and datasource config
- `product.prisma` — Product, Description, Review, Tag models

### Models

| Model | Description |
| --- | --- |
| `Product` | Core product with name, price, availability |
| `Description` | One-to-one optional description for a product |
| `Review` | One-to-many reviews per product |
| `Tag` | Many-to-many tags across products |

### Availability Enum

```text
IN_STOCK | OUT_OF_STOCK | PRE_ORDER
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get product by ID (includes description, reviews, tags) |
| POST | `/products` | Create a product |
| PATCH | `/products/:id` | Update a product |
| DELETE | `/products/:id` | Delete a product |

### Create Product Example

```json
POST /products
{
  "name": "Laptop",
  "price": 999.99,
  "available": "IN_STOCK",
  "description": {
    "create": { "content": "A powerful laptop" }
  },
  "reviews": {
    "create": [{ "rating": 5, "title": "Great!", "content": "Loved it" }]
  },
  "tag": {
    "create": [{ "content": "electronics" }]
  }
}
```

## Prisma Commands

```bash
# Run migrations
npx prisma migrate dev

# Open Prisma Studio (DB GUI)
npx prisma studio

# Regenerate Prisma client
npx prisma generate
```

## Project Structure

```text
src/
  products/         # Products module (controller, service, module)
  database/         # Prisma database service
prisma/
  schema/           # Multi-file Prisma schema
    base.prisma     # Generator & datasource
    product.prisma  # Models
  migrations/       # Migration history
prisma.config.ts    # Prisma configuration
```
