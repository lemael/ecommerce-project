import { Bestellung } from "../../models/Bestellung";
import BestellungItem from "./BestellungItem";

interface Props {
  bestellungen: Bestellung[];
  onUpdate: (updater: (prev: Bestellung[]) => Bestellung[]) => void;
}

const BestellungListe = ({ bestellungen, onUpdate }: Props) => {
  console.log("Bestellungen:", bestellungen);
  return (
    <>
      {bestellungen.map(
        (bestellung, index) =>
          bestellung !== undefined && (
            <BestellungItem
              key={index}
              bestellungKey={bestellung.detailBestellungen[0]?.bestellungId}
              bestellung={bestellung}
              onUpdate={onUpdate}
            />
          )
      )}
    </>
  );
};

export default BestellungListe;
