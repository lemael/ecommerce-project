import { AnmeldenUrl, InscriptionUrl } from "../utils/constants";

const handleConnexionSubmit = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(AnmeldenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la connexion : ${response.status}`);
    }

    const user = await response.json();
    localStorage.setItem("token", user.token);
    console.log("Token d'authentification stocké :", user.token);

    console.log("user name d'authentification stocké :", user.token);

    // Rediriger l'utilisateur vers la page d'accueil
    window.location.href = "/";
  } catch (error) {
    console.error(error);
  }
};
const handleInscriptionSubmit = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(InscriptionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de l'inscription : ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    // Sauvegarder le token d'authentification dans le localStorage
    localStorage.setItem("token", result.token);
    // Rediriger l'utilisateur vers la page d'accueil
    window.location.href = "/";
    localStorage.setItem("token", result.token);
  } catch (error) {
    console.error(error);
    // Afficher un message d'erreur à l'utilisateur
  }
};

export { handleConnexionSubmit, handleInscriptionSubmit };
