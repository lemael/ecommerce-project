interface Props {
  total: number;
}

const OrderSummary = ({ total = 0 }: Props) => {
  if (total === 0) {
    return null;
  }
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Zusammenfassung der Bestellung</h5>
        <p className="d-flex justify-content-between">
          <span>Zwischensumme</span>
          <span>{total.toFixed(2)} €</span>
        </p>
        <p className="d-flex justify-content-between">
          <span>Voraussichtliche Lieferung</span>
          <span>0.00 €</span>
        </p>
        <hr />
        <p className="d-flex justify-content-between fw-bold">
          <span>Summe</span>
          <span>{total.toFixed(2)} €</span>
        </p>
        <button className="btn btn-dark w-100 mt-3">Zur Kasse gehen</button>

        <div className="mt-3 text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
            alt="Visa"
            width={40}
            className="mx-1"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/30/Mastercard-logo.svg"
            alt="Mastercard"
            width={40}
            className="mx-1"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/57/AMEX_logo.svg"
            alt="Amex"
            width={40}
            className="mx-1"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/39/PayPal_logo.svg"
            alt="PayPal"
            width={60}
            className="mx-1"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
