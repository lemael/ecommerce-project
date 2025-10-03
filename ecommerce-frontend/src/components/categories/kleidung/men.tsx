import React from "react";
import Produkt from "../../Produkt";
import Chatbot from "../../chatbot";
import CategoryNavbar from "../../CategoryNavbar";

interface menProps {}

const Men: React.FC<menProps> = () => {
  return (
    <main>
      <header>
        <CategoryNavbar />
      </header>
      <div className="products-grid">
        <br></br>
        <br></br>
        <Produkt category="men's clothing" />
      </div>
      <Chatbot />
    </main>
  );
};

export default Men;
