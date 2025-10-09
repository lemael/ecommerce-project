import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

interface InscriptionFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
}

const InscriptionForm: React.FC<InscriptionFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
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
    await onSubmit({ name, email, password }).catch((err) => {
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
        <br></br>

        <h2 className="text-center mb-4">Registrieren</h2>

        {/* ✅ Message d'erreur */}
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button variant="dark" type="submit">
          Inscription
        </Button>
        <p className="mt-3">
          Haben Sie bereits ein Konto?{" "}
          <Link className="text-dark" to="/connexion">
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default InscriptionForm;
