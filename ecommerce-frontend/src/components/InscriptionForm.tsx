import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AnmeldenUrl_frontend } from "../utils/constants";

interface InscriptionFormProps {
  onSubmit: (data: { name: string; email: string; password: string }) => void;
}

const InscriptionForm: React.FC<InscriptionFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ name, email, password });
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
        <h2 className="text-center mb-4">Registrieren</h2>
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
        <Button variant="primary" type="submit">
          Inscription
        </Button>
        <p className="mt-3">
          Haben Sie bereits ein Konto? <a href={AnmeldenUrl_frontend}>Login</a>
        </p>
      </Form>
    </div>
  );
};

export default InscriptionForm;
