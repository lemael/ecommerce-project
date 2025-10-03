import { Bestellung } from "../../models/Bestellung";
import { formatDate } from "../../utils/formatDate";
import BestellungDetailListe from "./BestellungDetailListe";

interface Props {
  bestellungKey: number | undefined;
  bestellung: Bestellung;
  onUpdate?: (updater: (prev: Bestellung[]) => Bestellung[]) => void;
}

const BestellungItem = ({ bestellungKey, bestellung, onUpdate }: Props) => {
  if (!bestellung) {
    return (
      <div className="alert alert-warning" role="alert">
        Keine Bestellung gefunden.
      </div>
    );
  }
  if (bestellung.detailBestellungen.length === 0) {
    return (
      <div className="alert alert-warning" role="alert">
        Keine Bestellung gefunden.
      </div>
    );
  }
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">
          Bestellung vom {formatDate(bestellung.dateBestellung)}
        </h5>

        <hr />

        <BestellungDetailListe
          details={bestellung.detailBestellungen || []}
          bestellungKey={bestellungKey}
          onUpdate={(updated) => {
            console.log("Commande mise à jour:", updated);
            if (onUpdate) {
              onUpdate((prevBestellungen) =>
                prevBestellungen.map((b) => (b.id === updated.id ? updated : b))
              );
            }
          }}
        />
      </div>
    </div>
  );
};

export default BestellungItem;
