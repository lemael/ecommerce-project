import React from "react";
import CategoryNavbar from "../../CategoryNavbar";
import Chatbot from "../../chatbot";

interface angebotProps {}

const Angebot: React.FC<angebotProps> = () => {
  return (
    <main>
      <header>
        <CategoryNavbar />
      </header>
      <div className="products-grid">
        <br></br>
        <br></br>
      </div>
      <Chatbot />
    </main>
  );
};

export default Angebot;
