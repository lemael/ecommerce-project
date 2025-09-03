import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import InscriptionForm from "../InscriptionForm";

describe("Composant Register", () => {
  it("sollte die Registrierungsfunktion mit den Benutzerinformationen aufrufen", async () => {
    const mockRegister = jest.fn();
    render(<InscriptionForm onSubmit={mockRegister} />);

    const inputUsername = screen.getByLabelText("Nom");
    const inputEmail = screen.getByLabelText("Email");
    const inputPassword = screen.getByLabelText("Mot de passe");
    const button = screen.getByText("Inscription");

    fireEvent.change(inputUsername, { target: { value: "nouvelUtilisateur" } });
    fireEvent.change(inputEmail, {
      target: { value: "nouvelutilisateur@example.com" },
    });
    fireEvent.change(inputPassword, { target: { value: "nouveauMotDePasse" } });
    fireEvent.click(button);

    await waitFor(() => expect(mockRegister).toHaveBeenCalledTimes(1));
    expect(mockRegister).toHaveBeenCalledWith({
      name: "nouvelUtilisateur",
      email: "nouvelutilisateur@example.com",
      password: "nouveauMotDePasse",
    });
  });
});
