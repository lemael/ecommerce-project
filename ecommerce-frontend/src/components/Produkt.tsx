import { useEffect, useState } from "react";
import Category from "../models/Category";
import { Product } from "../models/Produkt";
import { PRODUCTS_URL } from "../utils/constants";
import ProductCard from "./ProductCard";

interface ProduktProps {
  category?: Category;
}

const ProductComponent: React.FC<ProduktProps> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(PRODUCTS_URL)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const filteredProducts =
          category === "all"
            ? data
            : data.filter((product: Product) => product.category === category);
        setProducts(filteredProducts);
      })
      .catch((error) => setError(error.message));
  }, [category]);

  if (error)
    return <div className="text-danger text-center mt-3">Erreur : {error}</div>;

  return (
    <div className="container py-4">
      <div className="row g-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComponent;
