import { useEffect } from "react";

const InscriptionReussie = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/connexion";
    }, 3000); // Redirection nach 3 Sekunden
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Registrierung erfolgreich!</h1>
      <p className="lead">Ihre Registrierung wurde erfolgreich gespeichert.</p>
      <p>Sie werden in wenigen Sekunden zur Anmeldeseite weitergeleitet...</p>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Wird geladen...</span>
      </div>
    </div>
  );
};

export default InscriptionReussie;
