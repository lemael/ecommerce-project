import React from "react";
import { Link, useNavigate } from "react-router-dom";
interface HeaderProps {
  showButtons?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showButtons = true }) => {
  const navigate = useNavigate();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Mael Fosso Ecommerce</Link>
          </li>
          <li>
            <Link to="/uber-uns">Über uns</Link>
          </li>
        </ul>
        {showButtons && (
          <div className="button-container">
            <button className="button" onClick={() => navigate("/connexion")}>
              Anmelden
            </button>
            <button className="button" onClick={() => navigate("/inscription")}>
              Registrieren
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
