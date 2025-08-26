import { useLocation } from "react-router-dom";
import Header from "./Header";

const HeaderWrapper = () => {
  const location = useLocation();

  if (
    location.pathname === "/inscription" ||
    location.pathname === "/connexion"
  ) {
    return <Header showButtons={false} />;
  }

  return <Header showButtons={true} />;
};

export default HeaderWrapper;
