import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Accessories from "./components/categories/accessoires/accessoires";
import Angebot from "./components/categories/angebot/angebot";
import Geräte from "./components/categories/geräte/geräte";
import Men from "./components/categories/kleidung/men";
import Women from "./components/categories/kleidung/women";
import NeueWaren from "./components/categories/neue_waren/neueWaren";
import ConnexionForm from "./components/ConnexionForm";
import HeaderWrapper from "./components/HeaderWrapper";
import Home from "./components/Home";
import InscriptionForm from "./components/InscriptionForm";
import InscriptionReussie from "./components/InscriptionReussie";
import LogoutPage from "./components/LogoutPage";
import ProductDetail from "./components/ProductDetail";
import Warenkorb from "./components/warenkorb/Warenkorb";
import LieferungForm from "./components/zahlung/LieferungForm";
import ZahlungForm from "./components/zahlung/ZahlungForm";

import {
  handleConnexionSubmit,
  handleInscriptionSubmit,
} from "./services/authService";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  // const navigate = useNavigate();
  return (
    <BrowserRouter>
      <HeaderWrapper />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route
          path="/connexion"
          element={<ConnexionForm onSubmit={handleConnexionSubmit} />}
        />
        <Route
          path="/inscription"
          element={<InscriptionForm onSubmit={handleInscriptionSubmit} />}
        />
        <Route path="/deconnexion" element={<LogoutPage />} />
        <Route path="/warenkorb/" element={<Warenkorb />} />
        <Route path="/neue-waren/" element={<NeueWaren />} />
        <Route path="/kleidung/women" element={<Women />} />
        <Route path="/kleidung/men" element={<Men />} />
        <Route path="/geräte" element={<Geräte />} />
        <Route path="/accessoires" element={<Accessories />} />
        <Route path="/inscription-reussie" element={<InscriptionReussie />} />
        <Route path="/angebot" element={<Angebot />} />

        <Route path="/lieferung" element={<LieferungForm />} />
        <Route path="/zahlungForm" element={<ZahlungForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
