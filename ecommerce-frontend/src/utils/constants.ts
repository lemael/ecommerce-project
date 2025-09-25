// localhost
const API_URL = "http://localhost:5045";
const ORDERS_URL = `${API_URL}/orders`;
const PRODUCTS_URL = `${API_URL}/products`;
const BaseUrl = "http://localhost:5045/api";
const InscriptionUrl = BaseUrl + "/users";
const AnmeldenUrl = BaseUrl + "/auth/login";
const ChatbotUrl = BaseUrl + "/chatbot";
const InscriptionUrl_frontend = "http://localhost:3000/inscription";
const AnmeldenUrl_frontend = "http://localhost:3000/connexion";
const BESTELLEN_URL = `${API_URL}/api/bestellung`;
const DETAILBESTELLUNG = `${API_URL}/api/detailbestellung`;
const USER_URL = `${API_URL}/api/Auth`;

/*
// render
const API_URL = "https://ecommerce-project-2kvd.onrender.com";
const ORDERS_URL = `${API_URL}/orders`;
const PRODUCTS_URL = `${API_URL}/products`;
const BaseUrl = "https://ecommerce-project-2kvd.onrender.com/api";
const InscriptionUrl = BaseUrl + "/users";
const AnmeldenUrl = BaseUrl + "/auth/login";
const ChatbotUrl = BaseUrl + "/chatbot";
const InscriptionUrl_frontend =
  "https://ecommerce-project-2kvd.onrender.com/inscription";
const AnmeldenUrl_frontend =
  "https://ecommerce-project-2kvd.onrender.com/connexion";

const BESTELLEN_URL = `${API_URL}/api/bestellung`;
const DETAILBESTELLUNG = `${API_URL}/api/detailbestellung`;
const USER_URL = `${API_URL}/api/Auth`;
*/
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
