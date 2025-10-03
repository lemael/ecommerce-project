import { useEffect, useState } from "react";
import { Bestellung } from "../../models/Bestellung";
import { DetailBestellung } from "../../models/DetailBestellung";
import {
  decreaseItem,
  increaseItem,
  removeItem,
} from "../../services/bestellungItemFunktion";
import BestellungDetailItem from "./BestellungDetailItem";

interface Props {
  details: DetailBestellung[];
  bestellungKey: number | undefined;
  onUpdate: (updated: Bestellung) => void;
}

const BestellungDetailListe = ({ details, bestellungKey, onUpdate }: Props) => {
  const [detailBestellungen, setDetailBestellungen] = useState(details);

  useEffect(() => {
    setDetailBestellungen(details);
  }, [details]);
  const handleDecrease = async (ausgewählteDetail: DetailBestellung) => {
    const updated = await decreaseItem(bestellungKey, ausgewählteDetail);
    setDetailBestellungen(updated.detailBestellungen);

    onUpdate(updated);
  };

  const handleIncrease = async (ausgewählteDetail: DetailBestellung) => {
    const updated = await increaseItem(bestellungKey, ausgewählteDetail);
    setDetailBestellungen(updated.detailBestellungen);
    onUpdate(updated);
  };

  const handleRemove = async (ausgewählteDetail: DetailBestellung) => {
    const updated = await removeItem(bestellungKey, ausgewählteDetail);
    setDetailBestellungen(updated.detailBestellungen);
    onUpdate(updated);
  };
  return (
    <div className="mb-3">
      {/* Header row */}
      <div className="row align-items-center fw-bold text-muted small mb-2">
        <div className="col-6 col-md-6">Bestelldetails:</div>
        <div className="col-3 col-md-3 text-center">MENGE</div>
        {/*    <div className="col-3 col-md-2 text-end">PREIS</div>*/}
      </div>

      {/* Items */}
      <div className="">
        {detailBestellungen.map((detail, idx) => (
          <div key={idx} className="list-group-item px-0">
            <BestellungDetailItem
              detail={detail}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
              onDelete={handleRemove}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestellungDetailListe;
