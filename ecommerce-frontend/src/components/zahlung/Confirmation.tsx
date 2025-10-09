import React from "react";
import { useNavigate } from "react-router-dom";

interface ConfirmationProps {
  transactionNumber: string;
}

const Confirmation: React.FC<ConfirmationProps> = ({ transactionNumber }) => {
  const navigate = useNavigate();
  return (
    <div className="card shadow-sm">
      <div className="card-body text-center">
        <h5 className="card-title">Zahlung erfolgreich!</h5>
        <p>
          Ihre Transaktionsnummer ist: <strong>{transactionNumber}</strong>
        </p>
        <p>Vielen Dank für Ihre Bestellung!</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Zurück zur Startseite
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
