import axios from "axios";
import * as jwt from "jwt-decode";
import { Bestellung } from "../models/Bestellung";
import { Product } from "../models/Produkt";
import { BESTELLEN_URL, BaseUrl } from "../utils/constants";

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
    const res = await axios.post(`${BaseUrl}/user`, {
      sub: username,
    });
    console.log("le nom de l'utilisateur:", username);
    console.log("User ID erhalten:", res);
    const userId = res.data;
    console.log("User ID: {id: 1}", userId);
    console.log("id de l'utilisateur:", userId.id);
    const bestellung: Bestellung = {
      // L'ID sera généré par le backend
      kundeId: userId.id,
      //dateBestellung: new Date().toISOString(),
      total: produkt.price,
      // status: "En cours",
      detailBestellungen: [
        {
          produktId: produkt.id,
          menge: 1,
          preis: produkt.price,
          //    produkt: { name: produkt.name, price: produkt.price },
        },
      ],
    };

    const response = await axios.post(
      `${BESTELLEN_URL}/create-bestellung`,
      bestellung
    );
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
