import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    localStorage.setItem("user", "true");
    localStorage.setItem("userEmail", email);

    navigate("/");
  };

  return (
    <div className="login-page">
      {/* 🍕 Floating food animation */}
      <span className="food f1">🍕</span>
      <span className="food f2">🍔</span>
      <span className="food f3">🍩</span>
      <span className="food f4">🍜</span>

      <div className="login-card card shadow-lg">
        <h3 className="text-center mb-2">Welcome to 🍽️ CraveEazy</h3>
        <p className="text-center text-muted mb-4">
          Login to book your favorite table
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="📧 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-danger w-100 login-btn">
            Login 🍴
          </button>
        </form>
      </div>
    </div>
  );
};
const handleLogin = () => {
  if (email === "user@example.com" && password === "1234") {
    localStorage.setItem("userEmail", email); // ✅ store email
    navigate("/"); // home page
  } else {
    alert("Invalid credentials");
  }
};


export default Login;
