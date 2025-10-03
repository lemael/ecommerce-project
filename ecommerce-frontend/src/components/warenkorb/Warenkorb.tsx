import axios from "axios";
import * as jwt from "jwt-decode";
import { useEffect, useState } from "react";
import { Bestellung } from "../../models/Bestellung";
import { BESTELLEN_URL, USER_URL } from "../../utils/constants";
import BestellungListe from "./BestellungListe";
import OrderSummary from "./OrderSummary";

const Warenkorb = () => {
  const [bestellungen, setBestellungen] = useState<Bestellung[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const updateBestellungen = (
    updater: (prev: Bestellung[]) => Bestellung[]
  ) => {
    setBestellungen((prev) => updater(prev));
  };

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const user = userStorage ? JSON.parse(userStorage) : null;
    const decodedToken = jwt.jwtDecode(user.token);
    const username = (decodedToken as { sub: string }).sub;

    const fetchUserId = async () => {
      try {
        const res = await axios.get(
          `${USER_URL}/get-user-id-by-username/${username}`
        );
        return res.data;
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBestellung = async () => {
      try {
        const userId = await fetchUserId();
        const response = await axios.get(`${BESTELLEN_URL}/en-cours`);
        console.log("Bestellungen abgerufen:", response.data);
        if (user) {
          const filteredBestellungen = response.data.filter(
            (bestellung: Bestellung) => bestellung.kundeId === userId
            // && bestellung.status === Status.EnCours pas besion de filter je l ai fais dans le backend
          );
          setBestellungen(filteredBestellungen);
        } else {
          setError("Utilisateur non connecté");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBestellung();
  }, []);

  if (loading) return <div className="text-center mt-5">Laden...</div>;
  if (error)
    return <div className="alert alert-danger mt-5">Unbekannter Fehler</div>;
  if (!bestellungen || bestellungen.length === 0)
    return (
      <div className="alert alert-info mt-5">Keine Aufträge in Bearbeitung</div>
    );

  return (
    <div className="container my-5">
      <h2 className="mb-4">Ihr Warenkorb</h2>
      <div className="row">
        <div className="col-md-8">
          <BestellungListe
            bestellungen={bestellungen}
            onUpdate={updateBestellungen}
          />
        </div>
        <div className="col-md-4">
          <OrderSummary
            total={bestellungen.reduce(
              (acc, bestellung) =>
                acc +
                bestellung.detailBestellungen.reduce(
                  (acc2, detail) => acc2 + detail.preis * detail.menge,
                  0
                ),
              0
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Warenkorb;
