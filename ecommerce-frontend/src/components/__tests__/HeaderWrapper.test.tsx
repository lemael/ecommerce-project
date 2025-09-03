import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HeaderWrapper from "../HeaderWrapper";

jest.mock("../Header", () => {
  return function MockHeader({ showButtons }: { showButtons: boolean }) {
    return (
      <div>
        <h1>Header</h1>
        {showButtons && <button>Button</button>}
      </div>
    );
  };
});

describe("HeaderWrapper", () => {
  it("sollte die Buttons auf der Startseite anzeigen", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HeaderWrapper />
      </MemoryRouter>
    );

    expect(screen.getByText("Button")).toBeInTheDocument();
  });

  it("sollte die Buttons auf der Registrierungsseite nicht anzeigen", () => {
    render(
      <MemoryRouter initialEntries={["/inscription"]}>
        <HeaderWrapper />
      </MemoryRouter>
    );

    expect(screen.queryByText("Button")).not.toBeInTheDocument();
  });

  it("sollte die Buttons auf der Login-Seite nicht anzeigen", () => {
    render(
      <MemoryRouter initialEntries={["/connexion"]}>
        <HeaderWrapper />
      </MemoryRouter>
    );

    expect(screen.queryByText("Button")).not.toBeInTheDocument();
  });
});
