import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../models/Produkt";
import handleBuy from "../services/api";
import { ORDERS_URL, PRODUCTS_URL } from "../utils/constants";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(PRODUCTS_URL + `/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => setError(error.message));
  }, [id]);

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!product) {
    return <div>Lade Produktdetails...</div>;
  }

  return (
    <div style={styles.detailContainer}>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={styles.detailImage} />
      <p>
        <strong>Preis:</strong> {product.price} €
      </p>
      <p>
        <strong>Beschreibung:</strong> {product.description}
      </p>
      <button
        style={styles.buyButton}
        onClick={() =>
          handleBuy(ORDERS_URL, {
            productId: id!,
            quantity: 1,
          })
        }
      >
        Kaufen
      </button>
    </div>
  );
};

const styles = {
  detailContainer: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  detailImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    borderRadius: "10px",
    marginBottom: "20px",
  },
  buyButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ProductDetail;
