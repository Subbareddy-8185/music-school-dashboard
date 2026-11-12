import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { roleHome } from "../routes";

export default function Unauthorized() {
  const { user } = useAuth();
  return (
    <main className="container">
      <h2>Access denied</h2>
      <p>You don't have permission to view this page.</p>
      <Link to={user ? roleHome[user.role] : "/login"}>Go back to your dashboard</Link>
    </main>
  );
}