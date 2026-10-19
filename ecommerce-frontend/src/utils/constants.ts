
const API_URL =
  process.env.REACT_APP_API_URL;
const BaseUrl = `${API_URL}/api`;
const ORDERS_URL = BaseUrl + "/orders";
const PRODUCTS_URL = BaseUrl + "/products";
const InscriptionUrl = BaseUrl + "/users";
const AnmeldenUrl = BaseUrl + "/auth/login";
const ChatbotUrl = BaseUrl + "/chatbot";
const InscriptionUrl_frontend = `${API_URL}/inscription`;
const AnmeldenUrl_frontend = `${API_URL}/connexion`;

const BESTELLEN_URL = BaseUrl + "/bestellung";
const DETAILBESTELLUNG = BaseUrl + "/detailbestellung";
const USER_URL = BaseUrl + "/Auth";

export {
  AnmeldenUrl,
  AnmeldenUrl_frontend,
  API_URL,
  BaseUrl,
  BESTELLEN_URL,
  ChatbotUrl,
  DETAILBESTELLUNG,
  InscriptionUrl,
  InscriptionUrl_frontend,
  ORDERS_URL,
  PRODUCTS_URL,
  USER_URL,
};
