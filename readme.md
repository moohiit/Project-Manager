# Project Management Tool

## Setup Instructions

### Backend Setup

1. **Clone the repository**  
  ```bash
  git clone https://github.com/moohiit/Project-Manager.git
  cd backend
  ```

2. **Install dependencies**  
  ```bash
  npm install
  ```

3. **Configure environment variables**  
  - Copy `.env.example` to `.env` and update values as needed (MongoDB URI, JWT secret, etc).

4. **Run the backend server**  
  ```bash
  npm run dev
  ```
  The backend will start on the configured port (default: 5000).

### Frontend Setup

1. **Navigate to the frontend directory**  
  ```bash
  cd ../frontend
  ```

2. **Install dependencies**  
  ```bash
  npm install
  ```

3. **Configure environment variables**  
  - Copy `.env.example` to `.env` and update API endpoint if needed.

4. **Run the frontend app**  
  ```bash
  npm start
  ```
  The frontend will start on the configured port (default: 3000).

### Running Seeders

- To populate the database with test data, run the seed script from the backend directory:
  ```bash
  npm run seed
  ```
  This will create a test user, two sample projects, and three tasks per project.

---

## Feature List

- User registration and login with JWT authentication (HTTP-only cookies)
- Project CRUD: create, update, delete, and view projects
- Task management within projects (CRUD)
- Pagination and search for project lists
- Task filtering by status (todo, in-progress, done)
- Responsive UI with Tailwind CSS
- Protected routes for authenticated users
- Form validation using React Hook Form and Yup
- Lazy loading for improved performance
- Custom 404 Not Found page
- State management with Redux

---

## Known Limitations

- No email verification or password reset functionality
- No role-based access control (all users have the same permissions)
- File uploads (attachments) are not supported
- Docker support is optional and not included by default
- No real-time updates (e.g., via websockets)
- Limited error handling and logging in production

--- Project Management Tool

## Project Description

This is a basic **Project Management Tool** built using the **MERN stack** with the following technologies:

- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** React.js with TypeScript
- **Authentication:** JWT-based (stored in cookies)

The system allows users to:

- ✅ Register and login with email and password.
- ✅ Create, update, and delete projects.
- ✅ View a list of their own projects with pagination and search functionality.
- ✅ Manage tasks within each project.
- ✅ Filter tasks by status ("todo", "in-progress", "done").
- ✅ Add and edit projects and tasks with form validation.
- ✅ Navigate a responsive user interface built with Tailwind CSS.

### Key Features:
- JWT Authentication using HTTP-only cookies.
- Protected routes: Only logged-in users can access main pages.
- Separate layouts for authentication and protected content.
- Project and Task CRUD operations with clean API responses.
- Pagination and search for projects.
- Form validation using **React Hook Form** and **Yup**.
- Fully responsive design for desktop and mobile screens.
- Lazy loading with `React.lazy` and `Suspense` for improved performance.
- Custom 404 Not Found page.

### Seed Data
- A seed script is provided to quickly populate the database with:
  - One test user: `test@example.com` / `Test@123`
  - Two sample projects linked to this user.
  - Three tasks per project.

### Bonus Features
- Pagination and search implemented on the project list.
- State management using Redux.
- Docker support can be added (optional).

---

## API Endpoints (User Access)

### Authentication
- **POST** `/api/auth/register`
  - Registers a new user.
  - Body: `{ "email": "string", "password": "string" }`
  - Returns: `success, token in cookies`

- **POST** `/api/auth/login`
  - Logs in a user.
  - Body: `{ "email": "string", "password": "string" }`
  - Returns: `success, token in cookies`

- **GET** `/api/auth/logout`
  - Logs out the user.
  - Clears the cookie.

### Projects
- **GET** `/api/projects`
  - Fetch user’s projects.
  - Query: `?search=&page=`
  - Protected Route.

- **GET** `/api/projects/:id`
  - Fetch a single project by ID.
  - Protected Route.

- **POST** `/api/projects`
  - Create a new project.
  - Body: `{ "title": "string", "description": "string", "status": "active/completed" }`
  - Protected Route.

- **PUT** `/api/projects/:id`
  - Update an existing project.
  - Protected Route.

- **DELETE** `/api/projects/:id`
  - Delete a project.
  - Protected Route.

### Tasks
- **GET** `/api/tasks/project/:projectId`
  - Get all tasks for a specific project.
  - Query: `?status=`
  - Protected Route.

- **POST** `/api/tasks`
  - Create a new task.
  - Body: `{ "title": "string", "description": "string", "status": "todo/in-progress/done", "dueDate": "date", "projectId": "string" }`
  - Protected Route.

- **PUT** `/api/tasks/:id`
  - Update a task.
  - Protected Route.

- **DELETE** `/api/tasks/:id`
  - Delete a task.
  - Protected Route.

---

### Submission Notes
- The project structure is clean and modular.
- The application is ready for demonstration with seeded data.
- Complete backend, frontend, and README setup instructions are provided in the project.

---

Thank you!
