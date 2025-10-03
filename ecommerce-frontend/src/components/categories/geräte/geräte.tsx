import React from "react";
import CategoryNavbar from "../../CategoryNavbar";
import Produkt from "../../Produkt";
import Chatbot from "../../chatbot";

interface geräteProps {}

const Geräte: React.FC<geräteProps> = () => {
  return (
    <main>
      <header>
        <CategoryNavbar />
      </header>
      <div className="products-grid">
        <br></br>
        <br></br>
        <Produkt category="electronics" />
      </div>
      <Chatbot />
    </main>
  );
};

export default Geräte;
