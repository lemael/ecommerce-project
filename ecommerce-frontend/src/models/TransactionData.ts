import PaymentData from "./PaymentData";
interface TransactionData extends PaymentData {
  transactionNumber: string;
  timestamp: string;
}
export default TransactionData;
