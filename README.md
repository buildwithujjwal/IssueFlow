# IssueFlow

A full-stack issue tracking web application inspired by Jira, built with Node.js, Express.js, and MongoDB.

## Features

- **Authentication** — Register and login with JWT-based authentication and bcrypt password hashing
- **Role-Based Access Control** — First registered user becomes admin, rest are members
- **Projects** — Create and manage projects (admin only)
- **Issues** — Create, view, edit, and delete issues with status and priority tracking
- **Comments** — Add comments to issues with author attribution
- **File Attachments** — Attach files to issues
- **Search & Filtering** — Filter issues by status, priority, and search by title
- **EJS Frontend** — Server-rendered UI connected to REST API via fetch

## Tech Stack

- **Backend** — Node.js, Express.js
- **Database** — MongoDB, Mongoose
- **Authentication** — JWT, bcryptjs, cookie-parser
- **Frontend** — EJS, vanilla JavaScript
- **File Uploads** — Multer
- **Dev Tools** — Nodemon, dotenv

## Project Structure

```
issueflow/
├── server.js
├── .env
└── src/
    ├── config/
    │   ├── db.js
    │   └── multer.js
    ├── models/
    │   ├── User.js
    │   ├── Project.js
    │   ├── Issue.js
    │   └── Comment.js
    ├── controllers/
    │   ├── authController.js
    │   ├── projectController.js
    │   ├── issueController.js
    │   └── commentController.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   ├── cookieAuthMiddleware.js
    │   ├── roleMiddleware.js
    │   └── errorMiddleware.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── projectRoutes.js
    │   ├── issueRoutes.js
    │   ├── commentRoutes.js
    │   └── viewRoutes.js
    ├── views/
    │   ├── partials/
    │   │   └── navbar.ejs
    │   ├── login.ejs
    │   ├── register.ejs
    │   ├── dashboard.ejs
    │   ├── project.ejs
    │   └── issueDetail.ejs
    └── uploads/
```

## API Endpoints

### Auth
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/auth/register | Register a new user | Public |
| POST | /api/auth/login | Login and get JWT | Public |

### Projects
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/projects | Create a project | Admin |
| GET | /api/projects | Get all projects | Auth |
| GET | /api/projects/:id | Get project by ID | Auth |
| DELETE | /api/projects/:id | Delete a project | Admin |

### Issues
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/projects/:id/issues | Create an issue | Auth |
| GET | /api/projects/:id/issues | Get issues by project | Auth |
| GET | /api/issues/:id | Get issue by ID | Auth |
| PATCH | /api/issues/:id | Update an issue | Auth |
| DELETE | /api/issues/:id | Delete an issue | Admin |

### Comments
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/issues/:id/comments | Add a comment | Auth |
| GET | /api/issues/:id/comments | Get comments | Auth |
| DELETE | /api/comments/:id | Delete a comment | Author |

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/issueflow.git
cd issueflow
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
```

4. Start the server
```bash
npm run dev
```

5. Visit `http://localhost:5000/auth/register` to create your admin account.

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Login | /auth/login | Sign in to your account |
| Register | /auth/register | Create a new account |
| Dashboard | /dashboard | View all projects |
| Project Detail | /projects/:id | View issues in a project |
| Issue Detail | /issues/:id | View issue, comments, and attachments |

## Key Implementation Details

- First registered user automatically gets admin role
- JWT stored in cookies for session management
- File uploads stored in `src/uploads/` (excluded from git)
- Frontend uses fetch API to communicate with existing REST endpoints
- EJS partials used for shared navbar component