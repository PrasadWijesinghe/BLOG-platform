# Blog Management Backend

Backend system for a Blog Management Platform built with Node.js, Express, and MySQL, supporting authentication, role-based access control, and blog management.

## 1. Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- MySQL (local, e.g., XAMPP)
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root using `.env.example`.

Example for local MySQL (XAMPP):

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=blog_db
JWT_SECRET=secret123
```

### Database Setup

1. Start MySQL (XAMPP Control Panel).
2. Create a database named `blog_db`.
3. Import the provided `schema.sql` file to create tables.

### Run the Application

```bash
npm run dev
```

Server runs at:

- http://localhost:5000

## 2. How to Run with Docker

The project includes Docker configuration to run the API and MySQL in containers.

```bash
docker-compose up --build
```

The API will be available at:

- http://localhost:5000

## 3. API Documentation

### Authentication

- `POST /auth/register` — Register a new user
- `POST /auth/login` — Login and receive JWT token

### Users

- `GET /users` — Get all users (Admin only)
- `GET /users/:id` — Get user by ID (Protected)

### Blogs

- `POST /blogs` — Create a new blog (Protected)
- `GET /blogs` — Get all blogs (Pagination supported)
- `GET /blogs/:id` — Get blog by ID
- `PUT /blogs/:id` — Update blog (Owner or Admin only)
- `DELETE /blogs/:id` — Delete blog (Admin only)


## 4. Database Schema Explanation

### Users Table

Stores user accounts and roles.

- `id` — Primary key
- `name` — User name
- `email` — Unique email
- `password` — Hashed password
- `role` — `admin` or `user`
- `created_at` — Timestamp

### Blogs Table

Stores blog posts.

- `id` — Primary key
- `title` — Blog title
- `content` — Full blog content
- `summary` — Auto-generated summary
- `user_id` — Foreign key referencing `users(id)`
- `created_at` — Timestamp
