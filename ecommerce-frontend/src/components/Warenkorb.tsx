import axios from "axios";
import { useEffect, useState } from "react";
import { Bestellung } from "../models/Bestellung";
import { USER_URL } from "../utils/constants";

import * as jwt from "jwt-decode";
import { BESTELLEN_URL } from "../utils/constants";

const Warenkorb = () => {
  const [bestellungen, setBestellungen] = useState<Bestellung[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const user = userStorage ? JSON.parse(userStorage) : null;
    const decodedToken = jwt.jwtDecode(user.token);
    console.log("User from localStorage:", decodedToken);
    const username = (decodedToken as { sub: string }).sub;
    console.log("Username:", username);

    const fetchUserId = async () => {
      try {
        const res = await axios.get(
          `${USER_URL}/get-user-id-by-username/${username}`
        );
        const userId = res.data;
        return userId;
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBestellung = async () => {
      try {
        const userId = await fetchUserId();
        console.log("Fetched User ID:", userId);
        const response = await axios.get(`${BESTELLEN_URL}/en-cours`);
        if (user) {
          const filteredBestellungen = response.data.filter(
            (bestellung: Bestellung) => bestellung.kundeId === userId
          );
          setBestellungen(filteredBestellungen);
        } else {
          setError("Utilisateur non connecté");
        }

        console.log(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBestellung();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {"Erreur inconnue"}</div>;
  }

  if (!bestellungen) {
    return <div>Aucune commande en cours</div>;
  }

  return (
    <div>
      <h2>Warenkorb</h2>
      {bestellungen.map((bestellung, index) => (
        <div key={index}>
          <p>Total: {bestellung.total}</p>
          <p>Kunde ID: {bestellung.kundeId}</p>
          <p>Date de commande: {bestellung.dateBestellung}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Warenkorb;
