const formatExpiryDate = (value: string) => {
  const v = value.replace(/\D/g, "");
  if (v.length >= 3) {
    return v.substring(0, 2) + "/" + v.substring(2, 4);
  }
  return v;
};

export default formatExpiryDate;
