import { Link } from "react-router-dom";
import { Product } from "../models/Produkt";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div style={styles.productCard}>
        <h2 style={styles.productName}>{product.name}</h2>
        <img
          src={product.image}
          alt={product.name}
          style={styles.productImage}
        />
        <p style={styles.productPrice}>Preis : {product.price} €</p>
      </div>
    </Link>
  );
};

const styles = {
  productCard: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
  },
  productImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover" as const,
    borderRadius: "10px 10px 0 0",
  },
  productName: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  productPrice: {
    fontSize: "16px",
    color: "#666",
  },
};

export default ProductCard;
