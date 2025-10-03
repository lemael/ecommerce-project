import React from "react";
import CategoryNavbar from "../../CategoryNavbar";
import Produkt from "../../Produkt";
import Chatbot from "../../chatbot";

interface neuWarenProps {}

const NeuWaren: React.FC<neuWarenProps> = () => {
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

export default NeuWaren;
