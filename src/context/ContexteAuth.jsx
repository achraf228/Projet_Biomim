import { createContext, useContext, useState, useEffect } from "react";

const ContexteAuth = createContext(null);

export function FournisseurAuth({ children }) {
  const [utilisateur, setUtilisateur] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("biomim_token");
    const user = localStorage.getItem("biomim_user");
    if (token && user) setUtilisateur(JSON.parse(user));
    setChargement(false);
  }, []);

  const connexion = (userData, token) => {
    localStorage.setItem("biomim_token", token);
    localStorage.setItem("biomim_user", JSON.stringify(userData));
    setUtilisateur(userData);
  };

  const deconnexion = () => {
    localStorage.removeItem("biomim_token");
    localStorage.removeItem("biomim_user");
    setUtilisateur(null);
  };

  return (
    <ContexteAuth.Provider value={{ utilisateur, connexion, deconnexion, chargement }}>
      {children}
    </ContexteAuth.Provider>
  );
}

export const utiliserContexteAuth = () => useContext(ContexteAuth);