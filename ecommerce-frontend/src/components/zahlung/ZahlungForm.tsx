import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentData from "../../models/PaymentData";
import handleTransactionComplete from "../../services/handleTransactionComplete";
import ErrorspaymentData from "../../utils/ErrorspaymentData";
import formatCardNumber from "../../utils/formatCardNumber";
import formatExpiryDate from "../../utils/formatExpiryDate";
import generateTransactionNumber from "../../utils/generateTransactionNumber";

const ZahlungForm: React.FC = () => {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    fullName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    confirmPayment: false,
  });

  const [errors, setErrors] = useState<ErrorspaymentData>({
    fullName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    confirmPayment: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: ErrorspaymentData = {
      fullName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      confirmPayment: "",
    };

    if (!paymentData.fullName.trim()) {
      newErrors.fullName = "Vollständiger Name ist erforderlich";
    }

    if (!paymentData.cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) {
      newErrors.cardNumber = "Kartennummer muss 16 Ziffern haben";
    }

    if (!paymentData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      newErrors.expiryDate = "Format muss MM/JJ sein";
    }

    if (!paymentData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = "CVV muss 3-4 Ziffern haben";
    }

    if (!paymentData.confirmPayment) {
      newErrors.confirmPayment = "Bitte bestätigen Sie die Zahlung";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const transactionData = {
        ...paymentData,
        transactionNumber: generateTransactionNumber(),
        timestamp: new Date().toISOString(),
      };

      console.log("Transaction completed:", transactionData);
      // Here you would typically send data to your backend
      alert(
        `Zahlung erfolgreich! Transaktionsnummer: ${transactionData.transactionNumber}`
      );

      handleTransactionComplete(navigate, transactionData);
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setPaymentData((prev) => ({
      ...prev,
      cardNumber: formattedValue,
    }));
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setPaymentData((prev) => ({
      ...prev,
      expiryDate: formattedValue,
    }));
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Zahlungsinformationen</h5>

        <div className="alert alert-info mb-4">
          <small>
            <strong>Unterstützte Karten:</strong> Visa, Mastercard
          </small>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Vollständiger Name (wie auf der Karte)
            </label>
            <input
              type="text"
              className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
              name="fullName"
              value={paymentData.fullName}
              onChange={handleInputChange}
              placeholder="Max Mustermann"
            />
            {errors.fullName && (
              <div className="invalid-feedback">{errors.fullName}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Kartennummer</label>
            <input
              type="text"
              className={`form-control ${
                errors.cardNumber ? "is-invalid" : ""
              }`}
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="4242 4242 4242 4242"
              maxLength={19}
            />
            {errors.cardNumber && (
              <div className="invalid-feedback">{errors.cardNumber}</div>
            )}
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Ablaufdatum</label>
              <input
                type="text"
                className={`form-control ${
                  errors.expiryDate ? "is-invalid" : ""
                }`}
                name="expiryDate"
                value={paymentData.expiryDate}
                onChange={handleExpiryDateChange}
                placeholder="MM/JJ"
                maxLength={5}
              />
              {errors.expiryDate && (
                <div className="invalid-feedback">{errors.expiryDate}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">CVV</label>
              <input
                type="text"
                className={`form-control ${errors.cvv ? "is-invalid" : ""}`}
                name="cvv"
                value={paymentData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength={4}
              />
              {errors.cvv && (
                <div className="invalid-feedback">{errors.cvv}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <div className="form-check">
              <input
                className={`form-check-input ${
                  errors.confirmPayment ? "is-invalid" : ""
                }`}
                type="checkbox"
                name="confirmPayment"
                checked={paymentData.confirmPayment}
                onChange={handleInputChange}
                id="confirmPayment"
              />
              <label className="form-check-label" htmlFor="confirmPayment">
                Ja, ich bestätige die Zahlung
              </label>
              {errors.confirmPayment && (
                <div className="invalid-feedback d-block">
                  {errors.confirmPayment}
                </div>
              )}
            </div>
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              type="button"
              className="btn btn-outline-secondary me-md-2"
              onClick={() => navigate("/zahlungForm")}
            >
              Abbrechen
            </button>
            <button type="submit" className="btn btn-warning">
              Zahlung bestätigen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ZahlungForm;
