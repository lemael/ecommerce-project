import axios from "axios";
import { DETAILBESTELLUNG } from "../utils/constants";

const handleDelete = async (detailBestellungId: number) => {
  try {
    await axios.delete(`${DETAILBESTELLUNG}/${detailBestellungId}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default handleDelete;
