import React from "react";
import Produkt from "../../Produkt";
import Chatbot from "../../chatbot";
import CategoryNavbar from "../../CategoryNavbar";

interface accessoriesProps {}

const Accessories: React.FC<accessoriesProps> = () => {
  return (
    <main>
      <header>
        <CategoryNavbar />
      </header>
      <div className="products-grid">
        <br></br>
        <br></br>
        <Produkt category="jewelery" />
      </div>
      <Chatbot />
    </main>
  );
};

export default Accessories;
