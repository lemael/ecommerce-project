import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { InscriptionUrl_frontend } from "../../utils/constants";
import ConnexionForm from "../ConnexionForm";

describe("ConnexionForm", () => {
  it("sollte die Funktion onSubmit mit den Anmeldeinformationen aufrufen", async () => {
    const mockOnSubmit = jest.fn();
    render(<ConnexionForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Passwort");
    const submitButton = screen.getByRole("button", { name: "Anmelden" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "motdepasse" } });

    fireEvent.click(submitButton);

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledTimes(1));
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "motdepasse",
    });
  });

  it("sollte den Registrierungslink anzeigen", async () => {
    render(<ConnexionForm onSubmit={() => {}} />);
    const inscriptionLink = screen.getByText("Inscription");
    expect(inscriptionLink).toBeInTheDocument();
    expect(inscriptionLink).toHaveAttribute("href", InscriptionUrl_frontend);
  });
});
