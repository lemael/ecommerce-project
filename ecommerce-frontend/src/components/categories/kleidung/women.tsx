import React from "react";
import CategoryNavbar from "../../CategoryNavbar";
import Produkt from "../../Produkt";
import Chatbot from "../../chatbot";

interface womenProps {}

const Women: React.FC<womenProps> = () => {
  return (
    <main>
      <header>
        <CategoryNavbar />
      </header>
      <div className="products-grid">
        <br></br>
        <br></br>
        <Produkt category="women's clothing" />
      </div>
      <Chatbot />
    </main>
  );
};

export default Women;
