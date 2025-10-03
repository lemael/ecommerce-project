import axios from "axios";
import { useEffect, useState } from "react";

import { DetailBestellung } from "../../models/DetailBestellung";
import { Product } from "../../models/Produkt";
import { PRODUCTS_URL } from "../../utils/constants";

interface Props {
  detail: DetailBestellung;
  onDelete?: (detail: DetailBestellung) => void;
  onIncrease?: (detail: DetailBestellung) => void;
  onDecrease?: (detail: DetailBestellung) => void;
}

const BestellungDetailItem = ({
  detail,
  onDelete,
  onIncrease,
  onDecrease,
}: Props) => {
  const [produkt, setProdukt] = useState<Product | null>(null);
  const [detailBestellungen, setDetailBestellungen] = useState<
    DetailBestellung[]
  >([]);

  useEffect(() => {
    const fetchProdukt = async () => {
      try {
        const res = await axios.get(`${PRODUCTS_URL}/${detail.produktId}`);
        setProdukt(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement du produit", err);
      }
    };
    fetchProdukt();
  }, [detail.produktId]);

  if (!produkt) {
    return <li className="list-group-item">Chargement du produit...</li>;
  }
  return (
    <div className="row align-items-center py-3 border-bottom">
      {/* Colonne image + infos produit */}
      <div className="col-12 col-md-6 d-flex align-items-center mb-2 mb-md-0">
        {produkt.image && (
          <img
            src={produkt.image}
            alt={produkt.name}
            width={60} // plus petit sur mobile
            className="me-2 rounded"
          />
        )}
        <div>
          <p className="fw-bold mb-1">
            {produkt.name || `Produit ID: ${detail.produktId}`}
          </p>
        </div>
      </div>

      {/* Colonne quantité */}
      <div className="col-6 col-md-3 text-center mb-2 mb-md-0">
        <div className="d-flex justify-content-center align-items-center">
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            onClick={() => onDecrease && onDecrease(detail)}
          >
            -
          </button>
          <span>{detail.menge}</span>
          <button
            className="btn btn-outline-secondary btn-sm ms-2"
            onClick={() => onIncrease && onIncrease(detail)}
          >
            +
          </button>
        </div>
      </div>

      {/* Colonne prix + delete */}
      <div className="col-6 col-md-3 d-flex justify-content-between align-items-center">
        <span className="fw-bold small">{detail.preis.toFixed(2)} €</span>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => onDelete && onDelete(detail)}
        >
          ✕
        </button>
      </div>
    </div>
  );
};
export default BestellungDetailItem;
