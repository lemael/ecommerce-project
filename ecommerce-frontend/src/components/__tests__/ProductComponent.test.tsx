/**
 * @jest-environment node
 */

import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { PRODUCTS_URL } from "../../utils/constants";
import ProductComponent from "../Produkt";

jest.mock("msw/node", () => ({
  setupServer: () => ({
    listen: jest.fn(),
    close: jest.fn(),
    use: jest.fn(),
  }),
}));

jest.mock("msw", () => ({
  http: {
    get: jest.fn(),
  },
  HttpResponse: {
    json: jest.fn((data) => data),
  },
}));
(global as any).BroadcastChannel = class BroadcastChannel {
  constructor() {}
  postMessage() {}
  close() {}
};

const server = setupServer(
  http.get(PRODUCTS_URL, ({ request, params }) => {
    return HttpResponse.json([
      { id: 1, name: "Produit 1", price: 10.99 },
      { id: 2, name: "Produit 2", price: 5.99 },
    ]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("ProductComponent", () => {
  it("sollte Produkte anzeigen", async () => {
    render(<ProductComponent />);
    await screen.findByText("Produit 1");
    expect(screen.getByText("Produit 2")).toBeInTheDocument();
  });

  it("sollte einen Fehler anzeigen, wenn die Anfrage fehlschlägt", async () => {
    server.use(
      http.get(PRODUCTS_URL, ({ request, params }) => {
        return new HttpResponse(null, {
          status: 500,
          headers: {
            "Content-Type": "text/plain",
          },
        });
      })
    );

    render(<ProductComponent />);
    await screen.findByText("Erreur :");
  });
});
