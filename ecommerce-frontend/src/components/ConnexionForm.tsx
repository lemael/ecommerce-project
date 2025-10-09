import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

interface ConnexionFormProps {
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
}

const ConnexionForm: React.FC<ConnexionFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Error state changed:", error);
  }, [error]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //  Vérif champs vides
    if (!email || !password) {
      setError("Bitte füllen Sie alle Felder aus."); // "Veuillez remplir tous les champs"
      return;
    }
    await onSubmit({ email, password }).catch((err) => {
      setError(err.message);
    });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Form
        onSubmit={handleSubmit}
        className="p-3"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Anmelden</h2>
        {/* ✅ Message d'erreur */}
        {error && <div style={{ color: "red" }}>{error}</div>}

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Passwort</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button variant="dark" type="submit">
          Anmelden
        </Button>
        <p className="mt-3">
          Noch kein Konto ?{" "}
          <Link className="text-dark" to="/inscription">
            Inscription
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default ConnexionForm;
