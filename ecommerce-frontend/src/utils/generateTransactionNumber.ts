// Generate transaction number (simple implementation)
const generateTransactionNumber = () => {
  return (
    "TXN-" +
    Date.now() +
    "-" +
    Math.random().toString(36).substr(2, 9).toUpperCase()
  );
};
export default generateTransactionNumber;
