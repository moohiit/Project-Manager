# Project Management Tool

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
