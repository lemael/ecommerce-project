import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";

const CategoryNavbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{
        position: "fixed",
        top: "60px",
        left: "0",
        width: "100%",
        zIndex: "1000",
      }}
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/neue-waren">
                Neue Waren
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Kleidung
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/kleidung/women">
                    Women
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/kleidung/men">
                    Men
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/accessoires">
                Accessoires
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/geräte">
                Geräte
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/angebot">
                Angebot
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default CategoryNavbar;
