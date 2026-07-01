import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("login");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/products">
        Shop
      </Link>

      <div className="ms-auto d-flex gap-2">
        <Link className="btn btn-outline-light btn-sm" to="/products">
          Products
        </Link>

        <Link className="btn btn-outline-light btn-sm" to="/cart">
          Cart
        </Link>

        <button
          className="btn btn-warning btn-sm"
          onClick={logout}
          data-testid="logout"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}