// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const email = localStorage.getItem("userEmail");

  if (!email) {
    // ❌ User logged out → redirect to login
    return <Navigate to="/login" replace />;
  }

  // ✅ User logged in → show requested component
  return children;
};

export default ProtectedRoute;
