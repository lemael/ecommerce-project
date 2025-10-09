import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
// import CategoryNavbar from "./CategoryNavbar";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  isLoggedIn?: boolean;
  username?: string;
  showAuthButtons?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isLoggedIn = true,
  username,
  showAuthButtons = true, // <-- valeur par défaut
  onLogout,
}) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <nav className="navbar" aria-label="Hauptnavigation">
        <ul className="nav-list">
          {isLoggedIn && username && (
            <>
              <li
                className="d-none d-md-block nav-item welcome"
                style={{
                  fontWeight: "bold",
                  color: "gold",
                  left: "120px",
                  position: "absolute",
                }}
              >
                Willkommen, {username}
              </li>
              <li className="nav-item">
                <SearchBar />
              </li>
            </>
          )}
          <li
            className="d-none d-md-block nav-item position-absolute"
            style={{
              left: "50px", // valeur par défaut
            }}
            // pour les grands appareils
          >
            <Link to="/">E-Shop</Link>
          </li>

          <li
            className="d-block d-md-none nav-item position-absolute"
            style={{
              left: "20px", // valeur pour les petits appareils
            }}
          >
            <Link to="/">E-Shop</Link>
          </li>
          {/*}
          <li className="nav-item">
            <Link to="/uber-uns">Über uns</Link>
          </li>
          */}

          {showAuthButtons && (
            <li className="nav-item">
              <SearchBar />
            </li>
          )}
          {isLoggedIn && (
            <li className="nav-item" style={{ marginLeft: "100px" }}>
              <Link to="/warenkorb" aria-label="Warenkorb">
                <FontAwesomeIcon icon={faShoppingCart} />
              </Link>
            </li>
          )}
        </ul>

        {showAuthButtons && (
          <div className="button-container">
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                outline: "none",
              }}
              className="button"
              onClick={() => navigate("/connexion")}
            >
              <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" }} />
            </button>
          </div>
        )}
        {isLoggedIn && (
          <Dropdown>
            <Dropdown.Toggle
              style={{
                border: "none",
                backgroundColor: "transparent",
                outline: "none",
              }}
            >
              <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" }} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/deconnexion")}>
                Abmelden
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </nav>
      <hr style={{ border: "1px solid #ccc", margin: "10px 0" }} />
      {/* <CategoryNavbar />*/}
    </header>
  );
};

export default Header;
