import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { roleLabel } from "../routes";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>Music School Dashboard</h1>
        {user && (
          <div className="user-box">
            <span className="badge">{roleLabel[user.role]}</span>
            <span>{user.name}</span>
            <button className="page-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </header>
      <Outlet />
    </div>
  );
}