
import * as jwt from "jwt-decode";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";

interface UserToken {
  sub: string;
  email: string;
  jti?: string;
  iat: number;
  exp: number;
}

const HeaderWrapper = () => {
  const location = useLocation();
  const userStorage = localStorage.getItem("token");

  const authPages = [
    "/connexion",
    "/inscription",
    "/inscription-reussie",
  ];

  let header;

  try {
    if (authPages.includes(location.pathname)) {
      header = (
        <Header
          isLoggedIn={false}
          username=""
          showAuthButtons={false}
        />
      );
    } else if (userStorage) {
      const decodedToken = jwt.jwtDecode<UserToken>(userStorage);
      const username = decodedToken.sub ?? "";

      header = (
        <Header
          isLoggedIn={true}
          username={username}
          showAuthButtons={false}
        />
      );
    } else {
      header = (
        <Header
          isLoggedIn={false}
          username=""
          showAuthButtons={true}
        />
      );
    }
  } catch (error) {
    console.error("Erreur de décodage du token :", error);

    header = (
      <Header
        isLoggedIn={false}
        username=""
        showAuthButtons={true}
      />
    );
  }

  return (
    <>
      {header}
      <Outlet />
    </>
  );
};

export default HeaderWrapper;
