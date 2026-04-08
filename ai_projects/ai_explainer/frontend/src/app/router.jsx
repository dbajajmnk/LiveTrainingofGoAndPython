import { Navigate, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AppShell from "../components/layout/AppShell";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import LoginPage from "../features/auth/pages/LoginPage";
import SignupPage from "../features/auth/pages/SignupPage";
import CapabilityLabPage from "../features/capabilities/CapabilityLabPage";
import DashboardPage from "../features/dashboard/DashboardPage";
import CourseListPage from "../features/learning/pages/CourseListPage";
import ModuleDetailPage from "../features/learning/pages/ModuleDetailPage";
import ModuleListPage from "../features/learning/pages/ModuleListPage";
import TopicDetailPage from "../features/learning/pages/TopicDetailPage";

export const appRouter = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "capabilities", element: <CapabilityLabPage /> },
      { path: "learning", element: <Navigate to="/learning/courses" replace /> },
      { path: "learning/courses", element: <CourseListPage /> },
      { path: "learning/courses/:courseId/modules", element: <ModuleListPage /> },
      { path: "learning/modules/:moduleId", element: <ModuleDetailPage /> },
      { path: "learning/topics/:topicId", element: <TopicDetailPage /> },
    ],
  },
]);
