import { NavigateFunction } from "react-router-dom";
import TransactionData from "../models/TransactionData";

const handleTransactionComplete = (navigate: NavigateFunction, data: any) => {
  // Gérer les données de transaction
  navigate("/confirmation");
};

export default handleTransactionComplete;
