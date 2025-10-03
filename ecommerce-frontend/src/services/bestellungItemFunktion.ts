import axios from "axios";
import { Bestellung } from "../models/Bestellung";
import { DetailBestellung } from "../models/DetailBestellung";
import { BESTELLEN_URL } from "../utils/constants";

const decreaseItem = async (
  bestellungKey: number | undefined,
  detail: DetailBestellung
): Promise<Bestellung> => {
  if (!bestellungKey) {
    throw new Error("bestellungKey est undefined ou null");
  }

  const res = await axios.get(`${BESTELLEN_URL}/${bestellungKey}`);
  const bestellung = res.data;

  const existingDetail = bestellung.detailBestellungen.find(
    (d: DetailBestellung) => d.id === detail.id
  );

  if (!existingDetail) {
    console.error(
      `Detailbestellung mit ID ${detail.id} non trouvé dans la commande`
    );
    console.log("Bestellung data:", bestellung);
    console.log(
      "tous les detailBestellung data provenant de get(id):",
      bestellung.detailBestellungen
    );
    console.log("le detailbestellung que je veux modifier:", detail);
    return bestellung;
  }

  const newMenge = existingDetail.menge > 1 ? existingDetail.menge - 1 : 1;

  const resUpdate = await axios.put(
    `${BESTELLEN_URL}/${bestellungKey}/details/${existingDetail.id}/${newMenge}`
  );
  console.log("Response data apres modification:", resUpdate.data);
  return resUpdate.data;
};

const increaseItem = async (
  bestellungKey: number | undefined,
  detail: DetailBestellung
): Promise<Bestellung> => {
  if (!bestellungKey) {
    console.error("bestellungKey est : ", bestellungKey);
    throw new Error("bestellungKey est undefined ou null");
  }

  const res = await axios.get(`${BESTELLEN_URL}/${bestellungKey}`);
  console.log("bestellungKey:", bestellungKey);
  console.log("Réponse de l'API :", res);
  console.log("Données de la commande :", res.data);
  console.log("Détails de la commande :", res.data.detailBestellungen);
  const bestellung = res.data;

  console.log("Données de la commande :", bestellung);
  console.log("Détails de la commande :", bestellung.detailBestellungen);

  if (!bestellung.detailBestellungen) {
    throw new Error("detailBestellungen est null ou undefined");
  }

  const existingDetail = bestellung.detailBestellungen.find(
    (d: DetailBestellung) => d.id === detail.id
  );

  if (!existingDetail) {
    console.log("Détail de commande non trouvé :");
    console.log("ID du détail de commande :", detail.id);
    console.log("Détails de la commande disponibles :");
    bestellung.detailBestellungen.forEach((d: DetailBestellung) => {
      console.log(`ID : ${d.id}`);
    });
    throw new Error(
      `Detailbestellung avec ID ${detail.id} non trouvé dans la commande`
    );
  }

  const newMenge = existingDetail.menge + 1;

  const resUpdate = await axios.put(
    `${BESTELLEN_URL}/${bestellungKey}/details/${existingDetail.id}/${newMenge}`
  );
  return resUpdate.data;
};
const removeItem = async (
  bestellungKey: number | undefined,
  detail: DetailBestellung
): Promise<Bestellung> => {
  const res = await axios.delete(
    `${BESTELLEN_URL}/${bestellungKey}/details/${detail.id}`
  );
  const bestellung = res.data;
  console.log("Response data apres suppression:", res.data);
  // si backend renvoie rien, on met à jour localement
  if (!res.data) {
    return {
      ...bestellung,
      detailBestellungen: bestellung.detailBestellungen.filter(
        (d: DetailBestellung) => d.produktId !== detail.produktId
      ),
    };
  }

  return res.data;
};

export { decreaseItem, increaseItem, removeItem };
