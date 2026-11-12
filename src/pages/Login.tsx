import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { ROLES } from "../types";
import { roleHome, roleLabel } from "../routes";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to={roleHome[user.role]} replace />;

  return (
    <main className="container">
      <h1>Music School Dashboard</h1>
      <h2>Sign in as</h2>
      <div className="role-grid">
        {ROLES.map((role) => (
          <button
            key={role}
            className="role-card"
            onClick={() => {
              login(role);
              navigate(roleHome[role], { replace: true });
            }}
          >
            {roleLabel[role]}
          </button>
        ))}
      </div>
      <p className="empty">Demo login for practice. No real authentication.</p>
    </main>
  );
}