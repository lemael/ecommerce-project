import axios from "axios";
import * as jwt from "jwt-decode";
import { Bestellung } from "../models/Bestellung";
import { Product } from "../models/Produkt";
import { BESTELLEN_URL } from "../utils/constants";

interface UserToken {
  sub: string;
  email: string;
  jti: string; // si le nom est facultatif
  iat: number;
  exp: number;
}
const handleKaufen = async (produkt: Product | null) => {
  if (!produkt) {
    throw new Error("Produit ist null oder undefined");
  }
  try {
    const user_token = JSON.parse(localStorage.getItem("user") ?? "null");
    const user = jwt.jwtDecode<UserToken>(user_token.token);
    const username = user?.sub ?? "";
    const res = await axios.post("http://localhost:5045/api/user", {
      sub: username,
    });
    console.log("le nom de l'utilisateur:", username);
    console.log("User ID erhalten:", res);
    const userId = res.data;
    const bestellung: Bestellung = {
      // L'ID sera généré par le backend
      KundeId: parseInt(userId),
      DateBestellung: new Date().toISOString(),
      Total: produkt.price,
      DetailBestellungen: [
        {
          ProduktId: produkt.id,
          Menge: 1,
          Preis: produkt.price,
        },
      ],
    };

    const response = await axios.post(BESTELLEN_URL, bestellung);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur Axios :", error.response?.data);
      if (error.response?.data.errors) {
        console.error("Erreurs de validation :", error.response.data.errors);
      }
    } else {
      console.error("Erreur :", error);
    }
    throw error;
  }
};

export default handleKaufen;
