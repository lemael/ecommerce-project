import React from "react";
import { useNavigate } from "react-router-dom";

const LieferungForm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="card shadow-sm"
      style={{ maxWidth: "400px", margin: "auto" }}
    >
      <div className="card-body">
        <h5 className="card-title">Lieferadresse</h5>
        <form>
          <div className="mb-3">
            <label className="form-label">Vorname</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Nachname</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Straße</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">PLZ</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Stadt</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Telefonnummer</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Zusätzliche Informationen</label>
            <textarea className="form-control" />
          </div>
          <button
            className="btn btn-dark btn-sm"
            onClick={() => navigate("/zahlungForm")}
          >
            Weiter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LieferungForm;
