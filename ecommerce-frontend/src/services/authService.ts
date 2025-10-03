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
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        console.log("Benutzer :", data.email);
        console.log("Passwort :", data.password);
        console.log("Response :", response);
        throw new Error("Benutzer wurde nicht gefunden."); // ✅ sera affiché
      }
      if (response.status === 401) {
        throw new Error("Falsches Passwort.");
      }
      throw new Error(`Fehler bei der Anmeldung: ${response.status}`);
    }

    const user = await response.json();
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", user.token);
    console.log("Token d'authentification stocké :", user.token);

    console.log("user name d'authentification stocké :", user.token);

    // Rediriger l'utilisateur vers la page d'accueil
    window.location.href = "/";
  } catch (error) {
    console.error(error);
    throw error;
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
      //  Ici on envoie une erreur claire au formulaire
      throw new Error("Email oder Passwort existiert nicht.");
    }

    const result = await response.json();

    console.log(result);
    // Sauvegarder le token d'authentification dans le localStorage
    localStorage.setItem("token", result.token);
    // Rediriger l'utilisateur vers la page d'accueil
    window.location.href = "/inscription-reussie";
    localStorage.setItem("token", result.token);
  } catch (error) {
    console.error(error);

    // Afficher un message d'erreur à l'utilisateur
    throw error;
  }
};

export { handleConnexionSubmit, handleInscriptionSubmit };
