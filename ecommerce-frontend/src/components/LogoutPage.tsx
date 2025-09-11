import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verbindung wird getrennt...");

  useEffect(() => {
    localStorage.removeItem("token");
    setTimeout(() => {
      setMessage("Sie wurden erfolgreich abgemeldet.");
      navigate("/connexion");
    }, 2000);
  }, [navigate]);

  return (
    <div>
      <h1>{message}</h1>
      {message === "Sie wurden erfolgreich abgemeldet." && (
        <p>Sie werden zur Anmeldeseite weitergeleitet.</p>
      )}
    </div>
  );
};

export default LogoutPage;
