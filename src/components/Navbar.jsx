import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4 d-flex align-items-center justify-content-between">
      {/* Logo */}
      <h4 className="text-danger fw-bold m-0">
        Crave<span className="text-dark">Eazy</span>
      </h4>

      {/* Search Bar */}
      <input
        className="form-control w-50 mx-3"
        placeholder="Search restaurants, locations or cuisines"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Auth Section */}
      {email ? (
        <div className="d-flex align-items-center gap-3">
          <span className="text-muted">{email}</span>
          <button className="btn btn-outline-danger" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login" className="btn btn-danger">
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
