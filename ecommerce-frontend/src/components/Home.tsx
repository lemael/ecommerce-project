import React from "react";
import Produkt from "./Produkt";
import Chatbot from "./chatbot";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <main>
      <div className="products-grid">
        <h2>Produkte</h2>

        <Produkt />
      </div>
      <Chatbot />
    </main>
  );
};

export default Home;
