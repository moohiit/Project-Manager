import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

// Lazy Load Pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const CreateProjectPage = lazy(() => import("./pages/CreateProjectPage"));
const EditProjectPage = lazy(() => import("./pages/EditProjectPage"));
const TaskListPage = lazy(() => import("./pages/TaskListPage"));
const AddTaskPage = lazy(() => import("./pages/AddTaskPage"));
const EditTaskPage = lazy(() => import("./pages/EditTaskPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="flex justify-center items-center h-screen text-xl">Loading...</div>}>
        <Routes>
          {/* Auth Section */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Main Section (Protected) */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/create-project" element={<CreateProjectPage />} />
            <Route path="/edit-project/:id" element={<EditProjectPage />} />
            <Route path="/tasks/:projectId" element={<TaskListPage />} />
            <Route path="/add-task/:projectId" element={<AddTaskPage />} />
            <Route path="/edit-task/:id" element={<EditTaskPage />} />
          </Route>

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
