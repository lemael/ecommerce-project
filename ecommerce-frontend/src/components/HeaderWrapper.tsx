import * as jwt from "jwt-decode";

import { useLocation } from "react-router-dom";

import Header from "./Header";

interface UserToken {
  sub: string; // nom ou identifiant
  email: string;
  jti?: string;
  iat: number;
  exp: number;
}

const HeaderWrapper = () => {
  const location = useLocation();
  const userStorage = localStorage.getItem("token");

  try {
    // Cas 2 : sur login ou register → pas de boutons + pas de username
    if (
      location.pathname === "/connexion" ||
      location.pathname === "/inscription"
    ) {
      return <Header isLoggedIn={false} username="" showAuthButtons={false} />;
    }

    // Cas 3 : utilisateur connecté
    if (userStorage) {
      const decodedToken = jwt.jwtDecode(userStorage) as UserToken;

      console.log("Token décodé:", decodedToken.sub);
      const username = decodedToken.sub ?? "";
      console.log("user décodé:", username);

      return (
        <Header isLoggedIn={true} username={username} showAuthButtons={false} />
      );
    } else {
      return <Header isLoggedIn={false} username="" showAuthButtons={true} />;
    }
  } catch (error) {
    console.error("Erreur de décodage du token:", error);
    return <Header isLoggedIn={false} username="" showAuthButtons={true} />;
  }
};

export default HeaderWrapper;
