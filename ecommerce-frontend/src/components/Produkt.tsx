import { useEffect, useState } from "react";
import { Product } from "../models/Produkt";
import { PRODUCTS_URL } from "../utils/constants";
import ProductCard from "./ProductCard";

const ProductComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(PRODUCTS_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div style={styles.productsGrid}>
      {Array.isArray(products) &&
        products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
    </div>
  );
};

const styles = {
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
};

export default ProductComponent;
