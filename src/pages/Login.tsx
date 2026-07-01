import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("login")) {
      navigate("/products");
    }
  }, [navigate]);

  const login = () => {
    localStorage.setItem("login", "true");
    navigate("/products");
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: 380 }}>
        <h1 className="h3 mb-4 text-center">Login</h1>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            data-testid="email"
            className="form-control"
            placeholder="email@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            data-testid="password"
            className="form-control"
          />
        </div>

        <button
          data-testid="login-button"
          onClick={login}
          className="btn btn-primary w-100"
        >
          Login
        </button>
      </div>
    </div>
  );
}