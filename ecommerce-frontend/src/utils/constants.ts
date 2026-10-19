
const API_URL =
  process.env.REACT_APP_API_URL;
const ORDERS_URL = `${API_URL}/orders`;
const PRODUCTS_URL = `${API_URL}/products`;
const BaseUrl = `${API_URL}/api`;
const InscriptionUrl = BaseUrl + "/users";
const AnmeldenUrl = BaseUrl + "/auth/login";
const ChatbotUrl = BaseUrl + "/chatbot";
const InscriptionUrl_frontend = `${API_URL}/inscription`;
const AnmeldenUrl_frontend = `${API_URL}/connexion`;

const BESTELLEN_URL = `${API_URL}/api/bestellung`;
const DETAILBESTELLUNG = `${API_URL}/api/detailbestellung`;
const USER_URL = `${API_URL}/api/Auth`;

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
