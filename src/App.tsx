import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/useAuth";
import { roleHome } from "./routes";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import SchoolDashboard from "./pages/SchoolDashboard";
import RoleDashboard from "./pages/RoleDashboard";

function HomeRedirect() {
  const { user } = useAuth();
  return <Navigate to={user ? roleHome[user.role] : "/login"} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<ProtectedRoute allowedRoles={["school"]} />}>
          <Route path="/school" element={<SchoolDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
          <Route
            path="/teacher"
            element={
              <RoleDashboard
                title="Teacher Dashboard"
                items={["My classes", "Class schedule", "Student feedback", "Recitals"]}
              />
            }
          />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route
            path="/student"
            element={
              <RoleDashboard
                title="Student Dashboard"
                items={["My courses", "Upcoming classes", "Feedback", "Recitals"]}
              />
            }
          />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["parent"]} />}>
          <Route
            path="/parent"
            element={
              <RoleDashboard
                title="Parent Dashboard"
                items={["My children", "Invoices", "Class schedule", "Feedback"]}
              />
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}