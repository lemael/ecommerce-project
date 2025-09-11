import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ConnexionForm from "./components/ConnexionForm";
import HeaderWrapper from "./components/HeaderWrapper";
import Home from "./components/Home";
import InscriptionForm from "./components/InscriptionForm";
import LogoutPage from "./components/LogoutPage";
import ProductDetail from "./components/ProductDetail";
import Warenkorb from "./components/Warenkorb";
import {
  handleConnexionSubmit,
  handleInscriptionSubmit,
} from "./services/authService";

interface AppProps {}

const App: React.FC<AppProps> = () => {
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
