/*
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BESTELLEN_URL } from "../utils/constants";
interface WarenkorbProps {
  userId: number; // ou string, selon le type de votre ID
}
// mettre simplement userId comme parametre de Warenkorb ne suffisait pas. userId etait any
// il fallait creer un interface WarenkorbProps qui definit userId
const Warenkorb: React.FC<WarenkorbProps> = () => {
  const userId = useParams();
  const userId_int = Number(userId); // convertir en number si necessaire
  console.log("userId dans Warenkorb.tsx :", userId);
  console.log("type de userId dans Warenkorb.tsx :", typeof userId_int);
  const [bestellungen, setBestellungen] = useState<BestellungMitId[]>([]);
  const [kundeId, setKundeId] = useState(userId_int); // Remplacez par l'ID du Kunde actuel

  interface BestellungMitId {
    id: number;
    KundeId: number;
    DateBestellung: string;
    Total: number;
    DetailBestellungen: {
      ProduktId: number;
      Menge: number;
      Preis: number;
    }[];
  }
  useEffect(() => {
    const fetchBestellungen = async () => {
      try {
        const response = await axios.get(BESTELLEN_URL);
        const allBestellungen = response.data;
        const kundeBestellungen = allBestellungen.filter(
          (bestellung: BestellungMitId) => bestellung.KundeId === kundeId
        );
        setBestellungen(kundeBestellungen);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestellungen();
  }, [kundeId]);

  return (
    <div>
      <h2>Warenkorb</h2>
      <ul>
        {bestellungen.map((bestellung) => (
          <li key={bestellung.id}>
            {bestellung.DateBestellung} - {bestellung.Total}
            <ul>
              {bestellung.DetailBestellungen.map((detail) => (
                <li key={detail.ProduktId}>
                  {detail.ProduktId} x {detail.Menge}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Warenkorb;
*/
// Warenkorb.tsx
import * as jwt from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../utils/constants";

interface UserToken {
  sub: string;
  email: string;
  jti: string;
  iat: number;
  exp: number;
}

const Warenkorb: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user_token = JSON.parse(localStorage.getItem("user") ?? "null");
      const token = user_token?.token;
      const user_decrypter = jwt.jwtDecode<UserToken>(token);

      if (!user_token) {
        console.warn("Aucun token trouvé");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(BaseUrl + "/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user_decrypter.sub,
            email: user_decrypter.email,
          }),
        });

        if (!response.ok) {
          throw new Error("Erreur API: " + response.status);
        }

        const user = await response.json();
        setUserId(user.id);
        console.log("User récupéré dans Warenkorb.tsx:", user);
      } catch (error) {
        console.error("Erreur lors de la récupération du user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Mon panier</h2>
      <p>User ID : {userId ?? "non connecté"}</p>
    </div>
  );
};

export default Warenkorb;
