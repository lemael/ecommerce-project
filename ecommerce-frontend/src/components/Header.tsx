import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryNavbar from "./CategoryNavbar";

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
            <li
              className="nav-item welcome"
              style={{ fontWeight: "bold", color: "gold" }}
            >
              Willkommen, {username}
            </li>
          )}
          <li className="nav-item">
            <Link to="/">Ecommerce-Project</Link>
          </li>
          <li className="nav-item">
            <Link to="/uber-uns">Über uns</Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <Link to="/warenkorb" aria-label="Warenkorb">
                🛒
              </Link>
            </li>
          )}
        </ul>

        {showAuthButtons && (
          <div className="button-container">
            <button className="button" onClick={() => navigate("/connexion")}>
              Anmelden
            </button>
            <button className="button" onClick={() => navigate("/inscription")}>
              Registrieren
            </button>
          </div>
        )}
        {isLoggedIn && (
          <div className="button-container">
            <button className="button" onClick={() => navigate("/deconnexion")}>
              Abmelden
            </button>
          </div>
        )}
      </nav>
      <hr style={{ border: "1px solid #ccc", margin: "10px 0" }} />
      <CategoryNavbar />
    </header>
  );
};

export default Header;
