import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { InscriptionUrl_frontend } from "../utils/constants";

interface ConnexionFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

const ConnexionForm: React.FC<ConnexionFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ email, password });
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
        <Button variant="primary" type="submit">
          Anmelden
        </Button>
        <p className="mt-3">
          Noch kein Konto ? <a href={InscriptionUrl_frontend}>Inscription</a>
        </p>
      </Form>
    </div>
  );
};

export default ConnexionForm;
