
import { createBrowserRouter } from "react-router-dom";

import Accessories from "../components/categories/accessoires/accessoires";
import Angebot from "../components/categories/angebot/angebot";
import Geräte from "../components/categories/geräte/geräte";
import Men from "../components/categories/kleidung/men";
import Women from "../components/categories/kleidung/women";
import NeueWaren from "../components/categories/neue_waren/neueWaren";

import ConnexionForm from "../components/ConnexionForm";
import HeaderWrapper from "../components/HeaderWrapper";
import Home from "../components/Home";
import InscriptionForm from "../components/InscriptionForm";
import InscriptionReussie from "../components/InscriptionReussie";
import LogoutPage from "../components/LogoutPage";
import ProductDetail from "../components/ProductDetail";
import Warenkorb from "../components/warenkorb/Warenkorb";
import LieferungForm from "../components/zahlung/LieferungForm";
import ZahlungForm from "../components/zahlung/ZahlungForm";

import {
  handleConnexionSubmit,
  handleInscriptionSubmit,
} from "../services/authService";

const router = createBrowserRouter([
  {
    element: <HeaderWrapper />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products/:id", element: <ProductDetail /> },
      {
        path: "/connexion",
        element: <ConnexionForm onSubmit={handleConnexionSubmit} />,
      },
      {
        path: "/inscription",
        element: <InscriptionForm onSubmit={handleInscriptionSubmit} />,
      },
      { path: "/deconnexion", element: <LogoutPage /> },
      { path: "/warenkorb", element: <Warenkorb /> },
      { path: "/neue-waren", element: <NeueWaren /> },
      { path: "/kleidung/women", element: <Women /> },
      { path: "/kleidung/men", element: <Men /> },
      { path: "/geräte", element: <Geräte /> },
      { path: "/accessoires", element: <Accessories /> },
      {
        path: "/inscription-reussie",
        element: <InscriptionReussie />,
      },
      { path: "/angebot", element: <Angebot /> },
      { path: "/lieferung", element: <LieferungForm /> },
      { path: "/zahlungForm", element: <ZahlungForm /> },
    ],
  },
]);

export default router;
