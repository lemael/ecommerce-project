import { OrderData } from "../models/OrderData";

const handleBuy = async (ordersUrl: string, orderData: OrderData) => {
  try {
    const response = await fetch(ordersUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de l'achat : ${response.status}`);
    }

    const data = await response.json();
    console.log(`Achat réussi : ${data}`);
  } catch (error) {
    console.error(`Erreur lors de l'achat : ${error}`);
  }
};

export default handleBuy;
